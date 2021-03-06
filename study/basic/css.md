## CSS

### BFC

BFC是css中的一个格式化上下文的方法，简单的来说就是让一个元素拥有自己的独立上下文，但是却不影响周边其他元素

常用于解决几个问题

1. float浮动带来的高度塌陷
2. margin的层叠

如何触发：

1. html根元素
2. float不为none
3. position不为relative或static
4. overflow为aoto，scroll或hidden
5. display为table-cell，table-caption或inline-block

### 移动端1px的问题

1. 使用box-shadow

box-shadow： 0 0 0 1px #000;

@media (min-resolution: 2dppx) {
    box-shadow: 0 0 0 .5px #b4a078;
}
@media (min-resolution: 3dppx) {
    box-shadow: 0 0 0 .333333px #b4a078;
}

2. 使用transform

transform: scale(.5) translateZ(0);

### 背景色覆盖border

background-clip: padding-box

### css3 animation 动画

<template>
    <div class="box">
        <div class="items">
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <div class="top"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="bottom"></div>
    </div>
</template>
<script>
export default {
    name: 'css3'
}
</script>

<style>
.box{
    position: relative;
    width: 50px;
    height: 50px;
    margin: 100px 0;
    animation: widthLong 8s infinite;
}
.box div{
    position: absolute;
    background-color: #f1f1f1;
}
.box .top{
    width: 100%;
    height: 10px;
    top: 0;
}
.box .left{
    height: 100%;
    width: 10px;
    left: 0;
}
.box .right{
    height: 100%;
    width: 10px;
    right: 0;
}
.box .bottom{
    width: 100%;
    height: 10px;
    bottom: 0;
    animation: borderHide 8s infinite;
}

.box .items{
    position: absolute;
    width: 15px;
    height: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background-color: #ff8c00;
    animation: widthLong1 8s infinite;
}
.box .items .item{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ff8c00;
}
.box .items .item:nth-child(1) {
    animation: rotate1 8s infinite;
}
.box .items .item:nth-child(2) {
    animation: rotate2 8s infinite;
}

@keyframes widthLong{
    0% {width: 50px}
    25% {width: 150px;}
    50% {transform: rotateZ(0)}
    75% {transform: rotateZ(180deg)}
    100% {width: 150px; transform: rotateZ(180deg)}
}
@keyframes widthLong1{
    0% {width: 15px}
    25% {width: 115px;}
    100% {width: 115px;}
}
@keyframes borderHide{
    0% {width: 50px}
    25% {width: 150px}
    50% {width: 0}
    100%{width: 0}
}
@keyframes rotate1{
    0% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    75% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    100% {transform: rotate(12deg); translateX: 10; top: 30px; right: 3px;}
}
@keyframes rotate2{
    0% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    75% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    100% {transform: rotate(24deg); translateX: 20; top: 60px; right: 10px}
}
</style>

``` vue

<div class="box">
    <div class="items">
        <div class="item"></div>
        <div class="item"></div>
    </div>
    <div class="top"></div>
    <div class="left"></div>
    <div class="right"></div>
    <div class="bottom"></div>
</div>

<style>
.box{
    position: relative;
    width: 50px;
    height: 50px;
    animation: widthLong 8s infinite;
}
.box div{
    position: absolute;
    background-color: #f1f1f1;
}
.box .top{
    width: 100%;
    height: 10px;
    top: 0;
}
.box .left{
    height: 100%;
    width: 10px;
    left: 0;
}
.box .right{
    height: 100%;
    width: 10px;
    right: 0;
}
.box .bottom{
    width: 100%;
    height: 10px;
    bottom: 0;
    animation: borderHide 8s infinite;
}

.box .items{
    position: absolute;
    width: 15px;
    height: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background-color: #ff8c00;
    animation: widthLong1 8s infinite;
}
.box .items .item{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ff8c00;
}
.box .items .item:nth-child(1) {
    animation: rotate1 8s infinite;
}
.box .items .item:nth-child(2) {
    animation: rotate2 8s infinite;
}

@keyframes widthLong{
    0% {width: 50px}
    25% {width: 150px;}
    50% {transform: rotateZ(0)}
    75% {transform: rotateZ(180deg)}
    100% {width: 150px; transform: rotateZ(180deg)}
}
@keyframes widthLong1{
    0% {width: 15px}
    25% {width: 115px;}
    100% {width: 115px;}
}
@keyframes borderHide{
    0% {width: 50px}
    25% {width: 150px}
    50% {width: 0}
    100%{width: 0}
}
@keyframes rotate1{
    0% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    75% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    100% {transform: rotate(12deg); translateX: 10; top: 30px; right: 3px;}
}
@keyframes rotate2{
    0% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    75% {transform: rotate(0); translateX: 0; top: 0; right: 0;}
    100% {transform: rotate(24deg); translateX: 20; top: 60px; right: 10px}
}
</style>

```

