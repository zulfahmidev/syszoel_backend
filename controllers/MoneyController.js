const Validate = require('../utils/Validate')
const { Player } = require('../models')
const MC = require('../utils/MC')

async function setMoney(req, res) {
  const data = {...req.body, ...req.params}

  let val = await Validate(data, {
    amount: `required|numeric`,
    xid: `required|exists:players,xid`,
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
    player = await player.update({
      money: data.amount
    })

    MC.getRCON().send(`update ${data.xid}`)

    return res.json({
      status: 200,
      data: player
    })
  }

  return res.json({
    status: 404
  })
}

async function payMoney(req, res) {
  const data = {...req.body, ...req.params}

  console.log(data)
  let val = await Validate(data, {
    amount: `required|numeric`,
    target_xid: `required|exist:players,xid,xid,${data.target_xid}`,
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

  let target = await Player.findOne({
    where: {
      xid: data.target_xid
    }
  })

  if (player && target) {
    if (player.money >= data.amount) {
      await player.update({
        money: parseInt(player.money) - parseInt(data.amount)
      })
      await target.update({
        money: parseInt(target.money) + parseInt(data.amount)
      })
  
      return res.json({
        status: 200
      })
    }
    return res.json({
      status: 400,
      message: 'The money is not enough.',
    })
  }

  return res.json({
    status: 404,
    message: 'Player not found.'
  })
}

module.exports = {
  setMoney, payMoney
}