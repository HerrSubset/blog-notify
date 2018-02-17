const fs = require('fs')
const notifier = require('node-notifier')
const Parser = require('rss-parser')
const parser = new  Parser()
const moment = require('moment')
const {largest_date} = require('./dates')

const week_ago = moment().subtract(7, 'days')
const config_path = `${process.env.HOME}/.config/blog-notify/config.json`


//////////////////////////////////////////////////////////////////////////////
// Utilities
//////////////////////////////////////////////////////////////////////////////
const read_config = () => {
    const config_file = fs.readFileSync(config_path, 'utf8')
    return JSON.parse(config_file)
}

const download_feed = (feed_config) => {
    return parser.parseURL(feed_config.url)
        .then(x => {
            x.source_url = feed_config.url
            x.latest_date = moment(feed_config.latest_date)
            return x
        })
}

const filter_out_old_posts = (feed) => ({
    title:  feed.title,
    url: feed.source_url,
    items:  feed.items.filter(x => moment(x.pubDate) > largest_date(week_ago, feed.latest_date))
})

const show_notifications = (feed)  => {
    feed.items.forEach(item =>
            notifier.notify({
                'title': `New at ${feed.title}`,
                'message': item.title
            })
    )
    return feed
}

const add_latest_date = (feed) => {
    feed.latest_date = feed.items.reduce((max, x) => largest_date(max, x.pubDate), week_ago)
    return feed
}

const delete_feed_posts = (feed) => {
    feed.items = undefined
    return feed
}

const process_feed = (feed_promise) =>
    feed_promise
        .then(filter_out_old_posts)
        .then(show_notifications)
        .then(add_latest_date)
        .then(delete_feed_posts)
        .catch(err => console.log(err))



//////////////////////////////////////////////////////////////////////////////
// Main
//////////////////////////////////////////////////////////////////////////////
// 1. read config
const config = read_config()
console.log(JSON.stringify(config, null, 2))

// 2. for each config, download and process
const feeds = config.blogs
    .map(download_feed)
    .map(process_feed)

// 3. the transformed feeds can be written out as the new config
Promise.all(feeds)
    .then(feeds => {
        config.blogs = feeds
        fs.writeFileSync(config_path, JSON.stringify(config, null, 2))
    })

