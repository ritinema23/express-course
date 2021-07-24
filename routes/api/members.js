const express = require('express');
const members = require('../../Members')
const router = express.Router();
const uuid = require('uuid');

// get members
router.get('/', (req, res) => {
    res.json(members)
})

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id===parseInt(req.params.id))
    if(found)
        res.json(members.filter(member => member.id===parseInt(req.params.id)))
    else
        res.status(400).json({msg: 'no member found'}) 
})

// create member
router.post('/', (req, res) => {
    const newmember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!req.body.name || !req.body.email){
        return res.status(400).json({msg: 'please enter the fields'})
    }

    members.push(newmember);
    res.json(members);
})

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id===parseInt(req.params.id))

    if(found){
        const updMember = req.body;
        members.forEach((member) => {
            if(member.id===parseInt(req.params.id) ){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: 'member updated', member})
            }
        })
    }
    else{
        res.status(400).json({msg: 'no member found'}) 
    }
})

//delete 
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id===parseInt(req.params.id))
    if(found)
    {
        res.json({msg:'member deleted', 
        members: members.filter(member => member.id!==parseInt(req.params.id))})
    }
    else
        res.status(400).json({msg: 'no member found'}) 
})

module.exports = router;