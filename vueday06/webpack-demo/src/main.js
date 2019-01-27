//使用es6的语法，引用jQuery
import $ from 'jquery'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

$(function(){
    $('li:odd').css('backgroundColor','#eee').css('opacity','0.5');
    // $('li:even').css('backgroundColor','#aaa').css('opacity','0.5')
    $('li:even').css({'backgroundColor':'aaa','opacity':'0.3'})
})