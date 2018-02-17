# Blog-Notify

Get desktop notifications for new posts on blogs you follow.


## Usage
First of all get the code by cloning the repository or 
downloading the source as zip file.

Before you can run the script, you should create a file
called `~/.config/blog-notify/config.json`. In there,
create a JSON object with a `blogs` property. That property
should be an array of objects, with at least an `url`
property, containing the link to an RSS feed.

Example:
```
{
  "blogs": [
    {
      "url": "http://feeds.feedblitz.com/daedtech/www&x=1",
    },
    {
      "url": "http://feeds.feedburner.com/Baeldung?format=xml",
    },
    {
      "url": "http://blog.cleancoder.com/atom.xml",
    }
  ]
}
```

Once you've done that, you can run `node index.js` and  the
script will display a popup for each new post that is 
available.


If you want to run this frequently, check out 
[Systemd timers][1] or [cron][2].


[1]: https://wiki.archlinux.org/index.php/Systemd/Timers
[2]: https://wiki.archlinux.org/index.php/Cron
