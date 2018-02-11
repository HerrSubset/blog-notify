const fs = require('fs')
const notifier = require('node-notifier')
const Parser = require('rss-parser')
const parser = new  Parser()
const moment = require('moment')

const week_ago = moment().subtract(7, 'days')
const config_path = `${process.env.HOME}/.config/blog-notify/config.json`

const read_config = () => {
    const config_file = fs.readFileSync(config_path, 'utf8')
    return JSON.parse(config_file)
}

const check_blog = async (feed_url) => {
    const feed = await parser.parseURL(feed_url)

    feed.items
        .filter(x => moment(x.pubDate) > week_ago)
        .forEach(item => {
            console.log(item.pubDate + ' : ' + item.title + ' : ' + item.link)
            notifier.notify({
                'title': `New at ${feed.title}`,
                'message': item.title
            })
        })
}


const config = read_config()

config.blogs
    .forEach(x => { 
        check_blog(x.url)
    })


fs.writeFileSync(config_path, `${JSON.stringify(config, null, 2)}\n`)
