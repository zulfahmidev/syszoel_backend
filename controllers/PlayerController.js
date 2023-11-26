const Validate = require('../utils/Validate')
const { Player } = require('../models')

function index(req, res) {
  return res.json({
    status: 200,
    data: []
  })
}

async function initPlayer(req, res) {
  const data = req.body

  let val = await Validate(data, {
    xid: `required`,
    nickname: `required`,
  })

  if (!val.isValid) {
    return res.json({
      status: 400,
      data: val.errors
    })
  }

  let player = await Player.findOne({
    where: {
      xid: data.xid
    }
  })
  if (!player) {
    player = await Player.create({
      xid: data.xid,
      nickname: data.nickname
    })
  }

  return res.json({
    status: 200,
    data: player
  })
}

async function updateData(req, res) {
  let data = req.params
  let updateData = req.body

  let val = await Validate(data, {
    xid: `required`
  })

  if (!val.isValid) {
    return res.json({
      status: 400,
      data: val.errors
    })
  }

  let player = await Player.findOne({
    where: {
      xid: data.xid
    }
  })

  if (player) {
    await player.update(updateData)
    return res.json({
      status: 200
    })
  }

  return res.json({
    status: 404,
    message: 'Player not found.'
  })
}

async function getData(req, res) {
  let data = req.params

  let val = await Validate(data, {
    xid: `required`
  })

  if (!val.isValid) {
    return res.json({
      status: 400,
      data: val.errors
    })
  }

  let player = await Player.findOne({
    where: {
      xid: data.xid
    }
  })

  if (player) {
    return res.json({
      status: 200,
      data: player
    })
  }

  return res.json({
    status: 404,
    message: 'Player not found.'
  })
}

module.exports = {
  initPlayer, index, getData, updateData
}