<p><a href="https://vk.com/@tproger_web-intro-to-css-shapes">https://vk.com/@tproger_web-intro-to-css-shapes</a></p>
<style>
.s1 {
	shape-outside: circle();
	width: 200px;
	height: 200px;
	background: #ccc;
	float: left;
	clip-path: circle();
}
.s2 {
	float: left;
	shape-outside: polygon(0 0, 0 300px, 200px 300px);
	clip-path: polygon(0 0, 0 300px, 200px 300px);
	background: linear-gradient(to top right, #67D7F5, #86F7CC);
	height: 300px;
	width: 300px;
	shape-margin: 10px;
}
.letter { 
  float: left; 
  font-size: 400px; 
  font-family: Georgia; 
  line-height: .8; 
  margin-top: 20px; 
  margin-right: 20px; 
  shape-outside: polygon(5px 14px, 233px 20px, 246px 133px, 189px 167px, 308px 304px, 0px 306px) content-box; 
  clip-path: polygon(5px 14px, 233px 20px, 246px 133px, 189px 167px, 308px 304px, 0px 306px); 
}

.clear:before, .clear:after {
  clear: both;
  content: "";
  display: block;
}
</style>

<div class="clear">
<div class="s1">11</div>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo laborum libero rem, hic sint rerum facilis qui ad, maiores ab quia autem laudantium aspernatur adipisci atque, doloremque voluptate consequuntur quidem!
</div>

<div class="clear" style="width: 500px">
<div class="s2">22</div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptatibus quos pariatur iusto repellendus fuga aut nihil impedit, officiis dignissimos inventore aliquid, rem, cum quas necessitatibus temporibus adipisci et quaerat.</p>
</div>

<div class="clear" style="width: 500px">
<div class="letter">R</div> 
<p>Пример текста... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo cum ad reprehenderit, laboriosam magni dolores et? Ad facilis cum sequi debitis. Labore excepturi non officia quod, reiciendis temporibus nisi fuga.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non obcaecati ex labore debitis iste delectus, aliquid quibusdam temporibus, ipsum error similique tempora aliquam rem quas magnam numquam eligendi provident impedit!</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non obcaecati ex labore debitis iste delectus, aliquid quibusdam temporibus, ipsum error similique tempora aliquam rem quas magnam numquam eligendi provident impedit!</p>
</div>

