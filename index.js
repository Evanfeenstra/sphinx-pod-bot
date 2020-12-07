import 'regenerator-runtime/runtime.js';
import * as Sphinx from 'sphinx-bot'
import * as fetch from 'node-fetch'
const msg_types = Sphinx.MSG_TYPE

let initted = false

/*
// SPHINX_TOKEN contains id,secret,and url
// message.channel.send sends to the url the data
*/

function init() {
  if (initted) return
  initted = true

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
        const isAdmin = message.member.roles.find(role => role.name === 'Admin')
        console.log('=> IS ADMIN?', isAdmin)
        if(!isAdmin) return
        try {
          const r = await fetch(TRIBE_URL+'/podcast?url='+podurl)
          if (!r.ok) return
          const j = await r.json()
          const embed = new Sphinx.MessageEmbed()
            .setAuthor('PodBot')
            .setTitle('Status:')
            .setDescription('PodBot will notify your tribe when a new episode is released')
            .setThumbnail(botSVG)
          message.channel.send({ embed })
        } catch (e) {
          console.log('Pod bot error', e)
        }
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