### 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

- 重绘是指元素几何属性变化但是布局没有变化的时候，浏览器的重新渲染方式
- 回流是指元素几何属性变化而且布局发生呢改变，浏览器发生的整个页面或者局部页面重新绘制的内容

> 如何优化

优化方面的内容特别的多，简单讲一下

- transform 替代 top
- visibility 替代 disabled: none（有一定局限性）
（样式的变化）
- 减少js对dom的操作
- 大动作操作dom的时候先将父元素用disabled: none 影藏然后在内部操作，操作完成在显示

###  如何解决移动端 Retina 屏 1px 像素问题

1. 使用border-image
2. 使用scale
3. box-shadow