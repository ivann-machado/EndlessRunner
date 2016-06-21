function mapGeneration(event) {
	var LastYline = event.data;
	var Yline = Math.ceil(Math.random() * 5);
	while (Yline - LastYline > 2) {
		Yline -= 1;
	}
	var platLength = Math.ceil(Math.random() * 5) + 1;
	var layers = [];
	var i;
	var tile;
	for (i = 1; i <= platLength; i += 1) {
		tile = {};
		tile.y = Yline;
		tile.position = Yline > 1 ? 'half' : 'normal';
		tile.type = i === 1 ? 'left' : (i === platLength ? 'right' : 'middle');
		layers.push(tile);
	}
    this.postMessage(layers);
}
this.addEventListener('message', mapGeneration);