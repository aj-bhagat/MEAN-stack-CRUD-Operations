const express = require('express');
var mongoose = require ('mongoose');
var router = express.Router();

var {Article} = require('../model/article');

router.get('/',(req,res)=>{
    Article.find((err,docs)=>{
        if(!err) {res.send(docs);}
        else {console.log('Error in Retriving Article :'+JSON.stringify(err,undefined,2));}
    });
});

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Article.findById(req.params.id, (err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retrieving Article:'+JSON.stringfy(err,undefined,2));}
    });
});

router.post('/',(req, res)=>{
    var blog=new Article({
        title: req.body.title,
        url: req.body.url
    });
    blog.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Article Save: '+JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    console.log(req.param.id);
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var blog={
        title: req.body.title,
        url: req.body.url
    };
    Article.findByIdAndUpdate(req.params.id,{$set: blog},{new:true}, (err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Updating Article:'+JSON.stringfy(err,undefined,2));}
    });
});

router.delete('/:id', (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Article.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Deleting Article:'+JSON.stringfy(err,undefined,2));}
    });
});

module.exports = router;