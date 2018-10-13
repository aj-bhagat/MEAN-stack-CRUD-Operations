const mongoose = require('mongoose');

var Article = mongoose.model('Article',{
    title: String ,
    url: String 
});

module.exports = {Article}; 