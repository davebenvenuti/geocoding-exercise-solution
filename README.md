# Notes

I started with the dow module, which has a method that will fetch the latest Dow Jones opening date, or the Dow Jones opening for a specified date (or the closest date to it if there is no data for that date).  Note the that the URL specified in the problem description didn't seem to work, and I had to find another one from Yahoo Finance, which unfortunately returned CSV instead of JSON, but I got that part working.  Next, I moved on to the geohash module, which uses the dow module to calculate the geohash per the XKCD comic.  I don't think the hashes are currently being calculated correctly, but the md5 generation and splitting of the md5 seems to work.  I left a TODO in geohash.js where we'd need to pick up.  I also spent a little time setting up the actual express app in app.js, but this hasn't really been tested at all yet.

As for my unit/functional tests, they're not set up 100% correctly - when an assertion from expect.js fails, rather than throwing the correct error, we simply get a timeout error, because the mocha done() callback never gets called, so we also need to spend a little time figuring out how to properly set that up, or use a different testing framework.


