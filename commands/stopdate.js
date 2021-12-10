const config = require("../config.js");
const { settings } = require("../modules/settings.js");
// this is just fake data. need to get from database
const userdata = require('../data/users')
const moment = require('moment')
exports.run = async (client, message, args, level) => {
  var member = message.author.nickname || message.author.username 

  let userObject = userdata.filter(user => {
      return user.username == member;
  })
  //split the quit date
  const m = moment(userObject[0].quitdate).startOf('day')
  const today = moment().startOf('day');
  var days = Math.round(moment.duration(today - m).asDays()) + 1;
  //const friendly = config.permLevels.find(l => l.level === level).name;
  const replying = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  message.reply({ content: `You have been quit ${days} days! Keep it up.`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stopdate",
  category: "Miscellaneous",
  description: "Tells you how many days you've been quit.",
  usage: "stopdate"
};
