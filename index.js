import 'regenerator-runtime/runtime.js';
import * as Sphinx from 'sphinx-bot'
import * as fetch from 'node-fetch'
const msg_types = Sphinx.MSG_TYPE
require('dotenv').config();
var redis = require('redis');
var storage = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

let initted = false

console.log("bot connected")

storage.set('foo', 'bar');
storage.get('foo', function (err, reply) {
    console.log(reply.toString()); // Will print `bar`
});

/*
// SPHINX_TOKEN contains id,secret,and url
// message.channel.send sends to the url the data
*/

const sphinxToken = process.env.SPHINX_TOKEN


//ON INSTALL:
//get tribe ID
//plug tribe ID into https://tribes.sphinx.chat/tribes/ID
//await fetch() from above url
//pull feed_url from above url
//plug feed_url into https://tribes.sphinx.chat/podcast?url=FEED_URL
//pull "episodes" array, first object, id: number
//store epidode ID number in object with storage.set(TRIBE_UUID, LATEST_EPISODE_ID)
//send install message






function init() {
  if (initted) return
  initted = true
  console.log("Bot Connected")

  const client = new Sphinx.Client()
  client.login(sphinxToken)

  client.on(msg_types.INSTALL, async (message) => {

    const embed = new Sphinx.MessageEmbed()
      .setAuthor('PodBot')
      .setDescription('Welcome to Pod Bot!')
      .setThumbnail(botSVG)
    message.channel.send({ embed })

  })


  client.on(msg_types.MESSAGE, async (message) => {
    const arr = message.content.split(' ')
    if (arr.length < 2) return
    if (arr[0] !== '/pod') return
    const cmd = arr[1]

    switch (cmd) {

      case 'watch':
        console.log("=> watch")
        let response = 'PodBot will notify your tribe when a new episode is released'
        const isAdmin = message.member.roles.find(role => role.name === 'Admin')
        console.log('=> IS ADMIN?', isAdmin)
        if(!isAdmin) return
          const tribeId = message.channel.id
          const episodeData = await getLatestEpisode(tribeId)

          if(episodeData && episodeData.id) {
            joinPodWatch(tribeId, episodeId)
          } else {
            response = 'There is no podcast associated with this tribe'
          }
          
          const embed = new Sphinx.MessageEmbed()
            .setAuthor('PodBot')
            .setTitle('Status:')
            .setDescription(response)
            .setThumbnail(botSVG)
          message.channel.send({ embed })

        return

      default:
        const embed = new Sphinx.MessageEmbed()
          .setAuthor('PodBot')
          .setTitle('PodBot Commands:')
          .addFields([
            { name: 'Watch for new episodes', value: '/pod watch' },
            { name: 'Help', value: '/pod help' }
          ])
          .setThumbnail(botSVG)
        message.channel.send({ embed })
        return
    }
  })
}

const botSVG = `<svg viewBox="64 64 896 896" height="12" width="12" fill="white">
  <path d="M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
</svg>`

init()

setInterval(function ()
  {
    client.keys('*', function (err, keys) {
      if (err) return console.log(err);

      asyncForEach(keys, checkForLatest)

    })
  }, 300000);




function getLatestEpisode(tribeId){
  try{
    const r = await fetch(`https://tribes.sphinx.chat/tribes/${tribeId}`)
    const tribeData = await r.json()
    if (tribeData && tribeData.feed_url) {
      const r2 = await fetch(`https://tribes.sphinx.chat/podcast?url=${value}`);
      const feedData = await r2.json()
      if (feedData && feedData.episodes && feedData.episodes[0]) {
        return feedData.episodes[0]
      }
    }
  }
  catch(e) {
    console.log('error')
  }
}

function joinPodWatch(tribeId, episodeId) {
    storage.set(tribeId, episodeId);
}


async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
	  	await callback(array[index], index, array);
	}
}

function checkForLatest(key, index, keys) {

  if(key.length!==92) return

  storage.get(key, function (err, storedId) {

    if(storedId.length!==10) return

    const episodeData = await getLatestEpisode(key)
    if(!(episodeData && episodeData.id)) return
    if(storedId === episodeData.id) return
    storage.set(key, episodeData.id)

    const relevantChannel = client.channels.cache.get(key)
    if(!relevantChannel) return

    const embed = new Sphinx.MessageEmbed()
          .setAuthor('PodBot')
          .setTitle('New Episode!')
          .addFields([
            { name: 'New Episode Title:', value: episodeData.title }
          ])
          .setThumbnail(botSVG)
        relevantChannel.send({ embed })

  });




}

//EVERY FIVE MINUTES:
// setInterval(function ()
// {
// }, 300000);
//
//const allKeys = storage.keys('*')

//AsyncForEach:
//  plug each tribe ID into https://tribes.sphinx.chat/tribes/ID
//  await fetch() from above url
//  pull feed_url from above url
//  plug feed_url into https://tribes.sphinx.chat/podcast?url=FEED_URL
//  pull "episodes" array, first object, id: number

//  Check if episode ID matches stored ID
//  IF YES: Return

//  IF NOT: Replace with epidode ID number in object with storage.set(TRIBE_UUID, LATEST_EPISODE_ID)
//  Send message to tribe announcing New Episode

