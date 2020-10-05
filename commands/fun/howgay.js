const Discord = require ('discord.js')

module.exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author
  if(user.bot)return;
  
  let string = `1
2
3
4
5
6
7
8
9
10
11
12
13
14
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100`
  let num = string.split('\n')
  let random = num[Math.floor(Math.random()*num.length)]

  if(user == message.author) {
    let embeds = new Discord.MessageEmbed()
  .setTitle(`Gayrate of ${user.username}`)
  .setDescription(`${user.username}, You are ${random}% **Gay** :gay_pride_flag:`)
  .setColor("c9df8a")
  message.channel.send(embeds)
  } else {
  
  let embed = new Discord.MessageEmbed()
  .setTitle(`Gayrate of ${user.username}`)
  .setDescription(`${user.username} is ${random}% **Gay** :gay_pride_flag:`)
  .setColor(client.colors.theme)
  message.channel.send(embed)
}}

module.exports.help = {
  name: "howgay",
  aliases: ["gayrate"],
  category: "Fun"
}