<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Document</title>
<script src="/jquery-3.4.1.min.js"></script>
<script src="/custom.js"></script>
<style>
.wrap {
    display: flex;
}
.filter_fields {
    flex: 0 1 300px;
}
.list {
    flex: 1 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
}
.item {
    border: 1px solid;
    padding: 10px;
}
</style>
</head>
<body>
<div class="wrap">
    <form action="" class="filter_fields">
        <h3>Color</h3>
        <div><input type="checkbox" name="color" value="4" id="color4" class="field checkbox"><label for="color4">Цвет 4</label></div>
        <div><input type="checkbox" name="color" value="5" id="color5" class="field checkbox"><label for="color5">Цвет 5</label></div>
        <div><input type="checkbox" name="color" value="6" id="color6" class="field checkbox"><label for="color6">Цвет 6</label></div>
        <h3>Width</h3>
        <div><input type="checkbox" name="width" value="12" id="width12" class="field checkbox"><label for="width12">Ширина 12</label></div>
        <div><input type="checkbox" name="width" value="22" id="width22" class="field checkbox"><label for="width22">Ширина 22</label></div>
        <h3>Label</h3>
        <div><input type="checkbox" name="label" value="dd" id="labelDD" class="field checkbox"><label for="labelDD">Метка DD</label></div>
        <div><input type="checkbox" name="label" value="ac" id="labelAC" class="field checkbox"><label for="labelAC">Метка AC</label></div>
        <div><input type="checkbox" name="label" value="qx" id="labelQX" class="field checkbox"><label for="labelQX">Метка QX</label></div>
    </form>
    <div class="list">
        <div class="item" data-color="5" data-width="12" data-label="dd">
            <h3>Апельсин</h3>
            <div><strong>Color</strong>: <span>5</span></div>
            <div><strong>Width</strong>: <span>12</span></div>
            <div><strong>Label</strong>: <span>dd</span></div>
        </div>
        <div class="item" data-color="4" data-width="22" data-label="ac">
            <h3>Яблоко</h3>
            <div><strong>Color</strong>: <span>4</span></div>
            <div><strong>Width</strong>: <span>22</span></div>
            <div><strong>Label</strong>: <span>ac</span></div>
        </div>
        <div class="item" data-color="5" data-width="22" data-label="dd">
            <h3>Киви</h3>
            <div><strong>Color</strong>: <span>5</span></div>
            <div><strong>Width</strong>: <span>22</span></div>
            <div><strong>Label</strong>: <span>dd</span></div>
        </div>
        <div class="item" data-color="6" data-width="12" data-label="ac">
            <h3>Груша</h3>
            <div><strong>Color</strong>: <span>6</span></div>
            <div><strong>Width</strong>: <span>12</span></div>
            <div><strong>Label</strong>: <span>ac</span></div>
        </div>
        <div class="item" data-color="6" data-width="12" data-label="ac">
            <h3>Слива</h3>
            <div><strong>Color</strong>: <span>6</span></div>
            <div><strong>Width</strong>: <span>12</span></div>
            <div><strong>Label</strong>: <span>ac</span></div>
        </div>
    </div>
</div>
</body>
</html>