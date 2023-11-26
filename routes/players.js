const express = require('express')
const MoneyController = require('../controllers/MoneyController')
const PlayerController = require('../controllers/PlayerController')

var router = express.Router()


router.post('/', PlayerController.index)
router.post('/init', PlayerController.initPlayer)
router.get('/:xid', PlayerController.getData)
router.post('/:xid/update-data', PlayerController.updateData)

router.post('/:xid/money/set', MoneyController.setMoney)
router.post('/:xid/money/pay', MoneyController.payMoney)

module.exports = router
