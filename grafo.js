/**
	algoritmos	
*/

//variaveis globais
var inf = 999999;

var white = 0;
var gray = 1;
var black = 2;

var dist;
var pred;
var color;

var time;

//grafo
function Grafo(tipo){
	this.vertice = [];
	this.val = [];
	this.tipo = tipo;
}

Grafo.prototype = {

	addVert: function(valor, x, y){
		this.vertice.push([]);
		
		for (var i = this.val.length - 1; i >= 0; i--) {
			if(this.val[i][0] == valor){
				//alert("valor ja inserido!");
				return -1;
			}
		};
		//var x = Math.floor(Math.random()*width);
		//var y = Math.floor(Math.random()*height);
		this.val.push([valor, x, y]);
		this.val
		//this.vertice[this.vertice.length] = [];
		//console.log(this.val, valor);
	},

	findVert: function(valor){
		var i;
		for (i = this.val.length - 1; i >= 0; i--) {
			if(this.val[i][0]==valor){
				return i;
			}
		};
		return -1;
		//alert("valor nao encontrado!");
	}, 

	rmVert:  function(valor){
		var ind;
		ind = this.findVert(valor);
		console.log(this.vertice[ind]);
		
		this.val.splice(ind, 1);
		var vert = this.vertice.splice(ind, 1);
		for (var i = 0; i < this.vertice.length; i++) {
			if (this.vertice[i][0] == vert[0]) {
				this.rmEdge(i, v);
			};
		};
	},

	addEdge: function(source, destiny, weight){
		//console.log(this.vertice)
		var i;
		for (i = 0; i < this.val.length; i++) {
			
			if(this.val[i][0] == source){
				//console.log(source, this.val[i], i);
				break;
			}
		};
		
		this.vertice[i].push([destiny, weight]);
		//console.log(this.vertice[i], destiny);
		if(this.tipo == "nao_direcionado"){
			for (i = 0; i < this.val.length; i++) {
				if(this.val[i][0] == destiny){
					//console.log(source, this.val[i], i);
					break;
				}
			};
			this.vertice[i].push([source, weight]);		
		}
			
	},

	rmEdge: function(source, destiny){
		var src = this.findVert(source);

		for (i = 0; i < this.vertice[src].length; i++) {
			if (this.vertice[src][i][0] == destiny) {
				//console.log(this.vertice[src][i][0], source);
				this.vertice[src].splice(i, 1);

			};
		};
		if(this.tipo == "nao_direcionado"){
			var i = this.findVert(destiny);
			for (i = 0; i < this.vertice.length; i++) {
				if (this.vertice[i][0] == source) {
					this.vertice.splice(i, 1);

				};
			};
		}
	}, 	

	adj: function(vert){
		var v = this.findVert(vert);
		var list = [];
		for(i = 0; i< this.vertice[v].length; i++){
			list.push(this.vertice[v][i][0])
			//console.log(list,this.vertice[v], v);
		 }
		 //console.log(list);
		 return list;
	},

	grau: function(vertice){
		var aux = this.findVert(vertice);
		return this.vertice[aux].length;

	},

	weight: function(source, destiny){
		var src = this.findVert(source);
		for (var i = this.vertice[src].length - 1; i >= 0; i--) {
			if(this.vertice[src][i][0] == destiny){
				//console.log(this.vertice[src][i][1], '\n');
				return  this.vertice[src][i][1];
			}
		};
		console.log(source, destiny, "Aresta nao encontrada.")
		return 0;
	},

	breadthSearch: function(source){
		dist = [];
		pred = [];
		color = [];
		for (var i = this.val.length - 1; i >= 0; i--) {
			dist.push(inf);
			pred.push(-1);
			color.push(white);
		};
		
		var src = this.findVert(source);
		
		dist[src] = 0;
		pred[src] = -1;
		color[src] = gray;

		fila = Array();
		fila.push(src);
		var way = new Grafo(this.tipo);
		way.addVert(this.val[src][0], this.val[src][1], this.val[src][2]);
		while(fila.length > 0){
			var u = fila.shift();
			var vizinho = this.adj(this.val[u][0]);
		
			//console.log(vizinho, this.val[u][0]);
			for (var i in vizinho) {
				//console.log(vizinho);
				var vert = this.findVert(vizinho[i]);
				
				if(color[vert] == white){
					//console.log( this.weight(this.val[u][0][0], this.val[vert][0][0]), "\n");
					color[vert] = gray;
					pred[vert] = u;
					dist[vert] = dist[u] + this.weight(this.val[u][0], this.val[vert][0]);
					
					way.addVert(vizinho[i], this.val[vert][1], this.val[vert][2]);
					way.addEdge(this.val[u][0], this.val[vert][0], this.weight(this.val[u][0], this.val[vert][0]));
					
					fila.push(vert);
					//console.log(fila);
				}
				//console.log("aki\n");
			};
			color[u] = black;
		}
		way.graphLog();
		return way;
	},

	deepSearch: function(source){
		dist = [];
		pred = [];
		color = [];

		for (var i = this.val.length - 1; i >= 0; i--) {
			dist.push(inf);
			pred.push(-1);
			color.push(white);
		};
		time = 0;
		//console.log("aki\n")
		var src = this.findVert(source);
		var way = new Grafo(this.tipo);
		way.addVert(this.val[src][0],this.val[src][1],this.val[src][2])
		this.deepVisit(src, 0, way);
		//console.log(pred);
		//way.graphLog();
		return way;
				//console.log(dist);	
	},

	deepVisit: function(src, distancia, way){
		color[src] = gray;
		dist[src] = distancia;
		
		var vizinho = this.adj(this.val[src][0]);
		//console.log(vizinho)
		for (var i = 0; i < vizinho.length; i++) {
			vert = this.findVert(vizinho[i]);
			//console.log(this.vertice[src], vert, "vizinho\n");
			if(color[vert] == white){
				pred[vert] = src;
				distancia += this.weight(this.val[src][0], vizinho[i]);
				
				way.addVert(vizinho[i], this.val[vert][1], this.val[vert][2]);
				way.addEdge(this.val[src][0], this.val[vert][0], this.weight(this.val[src][0], vizinho[i]));

				this.deepVisit(vert, distancia, way);
				
			}
		};
		color[src] = black;
		
	},

	top_sort: function(){	//ordenação topologica
		var ordlist = [];
		var ciclo = 1;
		for (var i = this.val.length - 1; i >= 0; i--) {
			if(this.vertice[i].length != 0){
				//console.log(this.val[i][0]);
				ordlist.push(this.deepSearch(this.val[i][0]));
			}
			else
				ciclo = 0;
		};
		if (ciclo == 1) {
			//alert("O grafo contem ciclos!!!");
			return -1;
		};
		/*
		for (var i = 0; i < ordlist.length; i++) {
			console.log("incdice", i);
			ordlist[i].graphLog();
		};
		*/
		return ordlist[src];
	},

	kruskal: function(){
		var k = [];
		var min = inf;
		var tmp = [];
		//inicializando k
		for (var i = 0; i < this.vertice.length-1; i++) {
			for (var j = 0; j < this.vertice[i].length; j++) {
				//var tmp = this.vertice[i][j];
				tmp.push(i);
				tmp.push(this.vertice[i][j][0]);
				tmp.push(this.vertice[i][j][1]);
				k.push(tmp);
				tmp = [];
			};
		};
		//console.log(k, "\n");
		k.sort(byWeight);
		//console.log(k, "\n");
		var msp = new Grafo("nao_direcionado");
		var ind = new Array(this.val.length);
		//inicialinzando tabela de indices
		for (var i = 0; i < ind.length; i++) {
			ind[i] = i;
		};
		console.log(k);
		while(k.length>0) {
			var edge = k.shift();
			
			var dest = this.findVert(edge[1]);
			if(ind[edge[0]] != ind[dest]){
				for (var i = ind.length - 1; i >= 0; i--) {
					if(i != dest && ind[i] == ind[dest]){
						//.log(ind[dest], i, ind[edge[0]]);
						ind[i] = ind[edge[0]];
						
					}
				};
				console.log(edge, ind);
				ind[dest] = ind[edge[0]];

				msp.addVert(this.val[edge[0]][0], this.val[edge[0]][1], this.val[edge[0]][2]);
				msp.addVert(edge[1], this.val[dest][1], this.val[dest][2]);
				msp.addEdge(this.val[edge[0]][0][0], edge[1], edge[2]);
			}
			
		}
		msp.graphLog();
		return msp;
	},

	dijstra: function(source){
		dist = [];
		pred = [];
		//console.log(source);
		for (var i = this.val.length - 1; i >= 0; i--) {
			dist.push(inf);
			pred.push(-1);
		};
		
		var src = this.findVert(source);
		
		dist[src] = 0;
		pred[src] = -1;

		fila = Array();
		fila.push(src);
		var way = new Grafo(this.tipo);
		for (var i = this.val.length - 1; i >= 0; i--) {
			way.addVert(this.val[i][0],this.val[i][1],this.val[i][2]);
		};

		while(fila.length > 0){
			fila.sort();
			var u = fila.shift();
			var vizinho = this.adj(this.val[u][0]);
			//console.log(vizinho);

			for (var i in vizinho) {
				//console.log(vizinho);
				var vert = this.findVert(vizinho[i]);
				var peso = this.weight(this.val[u][0], this.val[vert][0]);
				if(dist[vert] >= dist[u] + peso){
					//console.log( this.weight(this.val[u][0][0], this.val[vert][0][0]), "\n");
					if(pred[vert]!=-1){
						way.rmEdge(this.val[pred[u]][0], this.val[vert][0]);
					}
					way.addEdge(this.val[u][0], this.val[vert][0], peso);
					pred[vert] = u;
					dist[vert] = dist[u] + peso;
					fila.push(vert);
					//console.log(fila);
				}
				//console.log("aki\n");
			};
		}
		//way.graphLog();
		console.log(pred, dist);
		//return [dist, pred];
		return way;


	}, 

	bellmanFord: function(source){
		dist = [];
		pred = [];
		for (var i = 0; i < this.val.length; i++) {
			dist.push(inf);
			pred.push(-1);
		};

		var src = this.findVert(source);
		dist[src] = 0;
		var way = new Grafo(this.tipo);
		for (var i = this.val.length - 1; i >= 0; i--) {
			way.addVert(this.val[i][0],this.val[i][1],this.val[i][2]);
		};


		for (var i = 0; i < this.val.length; i++) {
			//para cada uma das arestas
			var trocou = false;
			for (var j = 0; j < this.vertice.length; j++) {
				var vizinho = this.adj(this.val[j][0]);
				//console.log("source",this.val[j][0]);
				
				for (var t = 0; t < vizinho.length; t++) {
					var dest = this.findVert(vizinho[t]);
					var peso = this.weight(this.val[j][0], this.val[dest][0]);
					//console.log("destiny", vizinho[t], dest, peso);
					if (dist[dest] > dist[j] + peso) {//relaxacao
						//console.log( this.val[dest][0], this.val[j][0] ,  peso);
						dist[dest] = dist[j] + peso;
						if(pred[j]!=-1){
							way.rmEdge(this.val[pred[j]][0], this.val[dest][0])
						}	
						pred[dest] = j;
						trocou = true;
						
						way.addEdge(this.val[j][0], this.val[dest][0], peso);
					};
				};
				//se nao nao houve mudanças iterações futuras nao sao necessarias
				
			};
			if(!trocou) break;
		};
		way.graphLog();
		//detectando ciclos negativos
		for (var j = 0; j < this.vertice.length; j++) {
			var vizinho = this.adj(this.val[j][0]);
			//console.log("source",this.val[j][0]);
			for (var t = 0; t < vizinho.length; t++) {
				var dest = this.findVert(vizinho[t]);
				//console.log("destiny", vizinho[t], dest);
				var peso = this.weight(this.val[j][0], this.val[dest][0]);
				if (dist[dest] > dist[j] + peso) {//relaxacao

					alert("Ciclo negativo de Arestas detectado!!!");
				};
			};
		}
		console.log("distancia", dist, "\ncaminho", pred);
		//return [dist, pred];
		return way;
	},


	graphLog: function(){
		for (var i = this.val.length - 1; i >= 0; i--) {
			console.log(this.val[i], "->", this.vertice[i], "\n");
		};
	}
		

}//fim da classe grafo

function byWeight(w1, w2){
	return w1[2] > w2[2];
}


var width = 600;
var height = 380;
var stage;
var stage_ex;
var layer;
var layer_ex;
var message_layer;

var raio = 20;
var arrow_size = 30;
var edge_color = "#000";
var text_color = "#000";
var node_color = "#f00";
var hlcolor    = "#0b0"

var g;

function writeMessage(message_layer, message) {
        console.log(message_layer)
        var context = message_layer.getContext();
        //message_layer.clear();
        context.font = '12pt Calibri';
        context.fillStyle = '#000';
        context.fillText(message, 10, 25);
}

function init(){
	stage = new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height,
        id: "grafo", 
    });
	
	stage_ex = new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height,
        id: "grafo", 
    });
  	//onAddVert(stage, layer, grafo);
  	layer = new Kinetic.Layer;
	layer.beforeDraw(function() {
   		updateGraph(layer);
  	});

  	layer_ex = new Kinetic.Layer;
  	layer_ex.beforeDraw(function() {
   		updateGraph(layer_ex);
  	});
  	
	//stage.add(message_layer);
	stage.add(layer);
	stage_ex.add(layer_ex);
}
window.onload = function(){
	//writeMessage(message_layer, "pressione Novo Grafo para iniciar.");
	init()
	//test();

	//draw_graph(g, layer, stage)
	//onAddVert(g);
	// onAddEdge(g);
	//addEdgeButton = true;
}

function test() {
	g = new Grafo("direcionado");


	g.addVert("a", Math.floor(Math.random()*width),  Math.floor(Math.random()*height));
	g.addVert("b", Math.floor(Math.random()*width),  Math.floor(Math.random()*height));
	g.addVert("c", Math.floor(Math.random()*width),  Math.floor(Math.random()*height));
	g.addVert('d', Math.floor(Math.random()*width),  Math.floor(Math.random()*height));
	g.addVert('e', Math.floor(Math.random()*width),  Math.floor(Math.random()*height));
	g.addEdge('a', 'b', 10);
	g.addEdge('a', 'c', 5);
	g.addEdge('a', 'd', 7);
	g.addEdge('b', 'c', 2);
	g.addEdge('b', 'e', 1);
	g.addEdge('c', 'b', 3);
	g.addEdge('c', 'e', 9);
	g.addEdge('c', 'd', 2);
	g.addEdge('d', 'e', 6);
	g.addEdge('d', 'a', 7);
	g.addEdge('e', 'd', 4);
 //console.log(g.vertice);
	//console.log(g.adj("a"));
	//draw_graph(g.breadthSearch('b'));
	//draw_graph(g.deepSearch("b"));
	//draw_graph(g.top_sort()[0]);
	//draw_graph(g.kruskal());
	//draw_graph(g.bellmanFord('a'));
	//draw_graph(g.dijstra('a'));
	
	g.graphLog();
}

function newGraph(){
	var tipo = prompt("Qual o tipo de Grafo?\n\'direcionado\', ou \'nao_direcionado\'");
	g = new Grafo(tipo);
}

//

function draw_graph(grafo, myLayer, myStage) {
  	drawEdges(grafo, myLayer, edge_color, text_color, arrow_size);
  	drawVertices(grafo, myLayer, raio, node_color, text_color);
 	myStage.add(myLayer);
}

function drawEdges(grafo, edge_layer, edge_color, text_color, arrowlen){

	var edges = [];
	var tmp = [];

	//inicializando edges
	if(grafo.tipo == "nao_direcionado"){
		for (var i = 0; i < grafo.vertice.length-1; i++) {
			for (var j = 0; j < grafo.vertice[i].length; j++) {
				tmp.push(grafo.val[i][0]);
				tmp.push(grafo.vertice[i][j][0]);//peso
				tmp.push(grafo.vertice[i][j][1]);//destino
				//console.log(grafo.vertice[i]);
				//tmp.unshift(grafo.val[i][0])//origem
				//console.log(tmp);
				if (edges.length == 0) {
					edges.push(tmp);
				}
				else{
					var ok = true;
					for (var t = edges.length - 1; t >= 0; t--) {	
						if(edges[t][0] == tmp[1][0] && edges[t][1] == tmp[0]){ //evita arestas repetidas
							ok = false;
							break;
						}
					}
					if(ok){
						edges.push(tmp);
					}
				}
				tmp = []; 
				//grafo.vertice[i].shift()
			};
		};
	}
	else{
		for (var i = 0; i < grafo.vertice.length; i++) {
			for (var j = 0; j < grafo.vertice[i].length; j++) {
				tmp.push(grafo.val[i][0]);
				tmp.push(grafo.vertice[i][j][0]);//peso
				tmp.push(grafo.vertice[i][j][1]);//destino
				edges.push(tmp);
				//console.log(tmp);
				tmp = [];
			}
		}	
	}
	//console.log(edges);
		//console.log(edges);
	for(var i = edges.length - 1; i >= 0; i--){
		drawEdge(grafo, edges[i], edge_layer, edge_color, text_color, arrowlen);		
	}// for edges

}

function drawEdge(grafo, edge, edge_layer, edge_color, text_color, arrowlen){
	//console.log(edge)
	var v1 = grafo.findVert(edge[0]);
	var v2 = grafo.findVert(edge[1]);

	var pontos = [grafo.val[v1][1], grafo.val[v1][2], grafo.val[v2][1],grafo.val[v2][2]];
	//console.log(pontos);
	var line = new Kinetic.Line({
		points: pontos,
		stroke: edge_color,
		strokeWidth: 5,
		name: "edge", 
		id: "edge", 
		peso: w
	});

	var w = edge[2];
	var peso = new Kinetic.Text({
		x: (pontos[0]+pontos[2])/2 + 5, 
		y: (pontos[1]+pontos[3])/2 + 5,
		text: String(w),
		fontSize: 14,
		fonFamily: "Calibri",
		textFill: 	text_color,
		name: "peso", 
		
	});
	//var raio = 20;
	line.source = grafo.val[v1][0];
	line.destiny = grafo.val[v2][0];
		
	peso.source = grafo.val[v1][0];
	peso.destiny = grafo.val[v2][0];

	line.moveDown();
	//peso.moveToTop()
	
	edge_layer.add(line);
	edge_layer.add(peso);
	
	if (grafo.tipo != "nao_direcionado") {
		var x_arrow = pontos[2];
		var y_arrow = pontos[3]; 

		var edgesize = Math.sqrt(((pontos[2]-pontos[0])*(pontos[2]-pontos[0]))+((pontos[3]-pontos[1])*(pontos[3]-pontos[1])));
		var angle = Math.acos((pontos[2]-pontos[0])/edgesize);

		//var arrowlen = 50;
		if(pontos[3]-pontos[1]<=0){
			var angle = 2*Math.PI - angle;
		}
		angle+=Math.PI/2;
		var ofsetx1 = Math.floor((arrowlen*Math.cos(angle + Math.PI/3 )));
		var ofsety1 = Math.floor((arrowlen*Math.sin(angle + Math.PI/3)));
		var ofsetx2 = Math.floor((arrowlen*Math.cos(angle + Math.PI - Math.PI/3)));
		var ofsety2 = Math.floor((arrowlen*Math.sin(angle + Math.PI - Math.PI/3)));
		//console.log(angle, ofsetx1, ofsety1, ofsetx2, ofsety2);
		var arrow = new Kinetic.Polygon({
			points: [x_arrow, y_arrow, x_arrow+ofsetx1, y_arrow+ofsety1, x_arrow+ofsetx2, y_arrow+ofsety2],
			fill: edge_color,
			stroke:  "#000",
			//draggable: true, 
			name: "arrow", 
			//offset:  [x_arrow+raio, y_arrow+raio],
		})

		arrow.source = grafo.val[v1][0];
		arrow.destiny = grafo.val[v2][0];
		arrow.len = arrowlen;
		arrow.moveToBottom();
		edge_layer.add(arrow);
	}
}

function drawVertices(grafo, node_layer, node_radius,node_color, text_color){

	var len = grafo.val.length;

	var node;
  	var valNode;
  	var grupo;
	//var nodeLayer = new Kinetic.Layer();
	//console.log(grupo.length);
	//console.log(grafo.val);
	for (var i = 0; i < len; i++){
		drawVert(grafo, i, node_layer, node_radius, node_color, text_color);
	};
		
};

function drawVert(grafo, vertpos, node_layer, node_radius,node_color, text_color){
	  	
	  	grupo = new Kinetic.Group({
  			draggable: true,
  			id: "node",
  			name: 'node', 
  		});
  		node = new Kinetic.Circle({
  			x: grafo.val[vertpos][1], 
  			y: grafo.val[vertpos][2],
  			radius: node_radius,
  			fill: node_color,
  			stroke: "Black",
  			strokeWidth: 4,
  			draggable: true,
  			name: "vertice",
  			
  			//visible: false
  		});
  		valNode = new Kinetic.Text({
  			x: grafo.val[vertpos][1]-5, 
  			y: grafo.val[vertpos][2]-5,
  			text: grafo.val[vertpos][0],
  			fontSize: 12,
  			fonFamily: "Calibri",
  			textFill: 	text_color,
  			name: "valor" 
  		});
  		grupo.add(node);
  		grupo.add(valNode);
  		grupo.valor = grafo.val[vertpos][0];
  		grupo.xOld = grafo.val[vertpos][1];
  		grupo.yOld = grafo.val[vertpos][2];
  		//grafo.val[vertpos][0] = grupo.valor;
  		//console.log(grupo.valor, grafo.val[vertpos][0]);
  		grupo.on("mouseover", function(){
  			document.body.style.cursor = "pointer";
  		});
  		grupo.on('mouseout', function() {
        	document.body.style.cursor = 'default';
      	});
      	grupo.on("mousedown", function(){
      		console.log(on_dijstra);
      		if(addEdgeButton){
      			if(edgeOrigin == null){
      				setEdgeOrigin(this.valor);
      				writeMessage(layer, "selecione o segundo vertice.");
      			}
      			else{
      				setEdgeDestiny(this.valor);
      				var weight = parseInt(prompt("qual o valor do peso dessa aresta?"));
      				grafo.addEdge(edgeOrigin, edgeDestiny, weight);
      				drawEdge(grafo, [edgeOrigin, edgeDestiny, weight], layer, edge_color, text_color, arrow_size);
      				this.moveUp();
      				layer.draw();
      				addEdgeButton = false;
      				edgeOrigin = null;
      				edgeDestiny = null;
      			}
      		}
      		else if(on_dijstra){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.dijstra(src);

      			layer_ex.clear();
      			layer_ex.removeChildren();
      			
      			draw_graph(way, layer_ex, stage_ex);
      			setVertColor(layer_ex, src, hlcolor);
      			on_dijstra = false;
      		}
      		else if(on_bellman){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.bellmanFord(src);
      			layer_ex.clear();
      			layer_ex.removeChildren();
      			draw_graph(way, layer_ex, stage_ex);
      			setVertColor(layer_ex, src, hlcolor);
      			on_bellman = false;
      		}
      		else if(on_breadth){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.breadthSearch(src);
      			
      			layer_ex.clear();
      			layer_ex.removeChildren();
      			draw_graph(way, layer_ex, stage_ex);
      			setVertColor(layer_ex, src, hlcolor);
      			on_breadth = false;
      		}
      		else if(on_deep){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.deepSearch(src);
      			
      			layer_ex.clear();
      			layer_ex.removeChildren();
      			draw_graph(way, layer_ex, stage_ex);
      			setVertColor(layer_ex, src, hlcolor);
      			on_deep = false;
      		}
      		else if(on_top_sort){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.top_sort(src);
      			if(way == -1){
      				alert("o grafo contem ciclos!")
      			}
      			else{
	      			layer_ex.clear();
	      			layer_ex.removeChildren();
	      			draw_graph(way, layer_ex, stage_ex);
	      			setVertColor(layer_ex, src, hlcolor);
	      			
	      		}
	      		on_top_sort = false;
      		}
      		else if(on_kruskal){
      			//console.log("aki2")
      			var src = this.valor;
      			var way = g.kruskal(src);
      			
      			layer_ex.clear();
      			layer_ex.removeChildren();
      			draw_graph(way, layer_ex, stage_ex);
      			on_kruskal = false;
      		}
      		else if(on_adj){
      			//console.log("aki2")
      			var src = this.valor;
      			//var way = g.dijstra(src);
      			//draw_graph(way, layer_ex, stage_ex);
      			//var color = prompt("Digite uma cor.");
      			console.log(color);
      			showAdj(layer, g, src, hlcolor);
      			on_adj = false;
      		}
      		else if(on_rm_vert){
      			//console.log("aki2")
      			var src = this.valor;
      			g.rmVert(src);
      			layer.clear();
      			this.remove();
      			//draw_graph(g, layer, stage);
      			on_rm_vert = false;
      		}
      		else if(on_rm_vert){
      			//console.log("aki2")
      			if(edgeOrigin == null){
      				setEdgeOrigin(this.valor);
      				writeMessage(layer, "selecione o segundo vertice.");
      			}
      			else{
      				setEdgeDestiny(this.valor);
      				var src = this.valor;
	      			g.rmEdge(edgeOrigin, edgeDestiny);
	      			layer.clear();
	      			layer.removeChildren();
	      			draw_graph(g, layer, stage);
      				on_rm_edge = false;
      				edgeOrigin = null;
      				edgeDestiny = null;
      			}
      		}
      		
      	})
       	
		node_layer.add(grupo);
		
}

function updateGraph(layer){
	
	var nodes   = layer.get(".node");
	var edges   = layer.get(".edge");
	var weights = layer.get(".peso");
	var arrows  = layer.get(".arrow");

	//console.log(nodes.length);
	for (var i = nodes.length - 1; i >= 0; i--) {
		if(nodes[i].isDragging()){
			//console.log(edges[i].source, edges[i].destiny);
			nodes[i].moveUp();
			for (var j = 0; j < edges.length; j++) {

				if (edges[j].source == nodes[i].valor){
					points = edges[j].getPoints();
					//console.log(points);
					points.splice(0, 1, {x:nodes[i].getX()+nodes[i].xOld, y:nodes[i].getY()+nodes[i].yOld});
					//console.log(points);
					edges[j].setPoints(points);

				}
				if (edges[j].destiny == nodes[i].valor) {
					points = edges[j].getPoints();
					points.splice(1, 1, {x:nodes[i].getX()+nodes[i].xOld, y:nodes[i].getY()+nodes[i].yOld});
					edges[j].setPoints(points);
				}
				for (var k = 0; k < weights.length; k++) {
					if(weights[k].source == edges[j].source && weights[k].destiny == edges[j].destiny){
						points = edges[j].getPoints();
						weights[k].setX((points[0].x + points[1].x)/2 + 5);
						weights[k].setY((points[0].y + points[1].y)/2 + 5);
					}
				}
				if (arrows.length >= 0){
					for (var k = 0; k < arrows.length; k++) {
						if(arrows[k].source == edges[j].source && arrows[k].destiny == edges[j].destiny){
							points = edges[j].getPoints();
							var edgesize = Math.sqrt(((points[0].x-points[1].x)*(points[0].x-points[1].x))+((points[0].y-points[1].y)*(points[0].y-points[1].y)));
							var angle = Math.acos((points[1].x-points[0].x)/edgesize);
							if (points[1].y-points[0].y<=0){
								angle = 2*Math.PI - angle;
							}
							var xarrow = points[1].x;
							var yarrow = points[1].y;

							angle+=Math.PI/2;
							var ofsetx1 = Math.floor((arrows[k].len*Math.cos(angle + Math.PI/3)));
							var ofsety1 = Math.floor((arrows[k].len*Math.sin(angle + Math.PI/3)));
							var ofsetx2 = Math.floor((arrows[k].len*Math.cos(angle + Math.PI - Math.PI/3)));
							var ofsety2 = Math.floor((arrows[k].len*Math.sin(angle + Math.PI - Math.PI/3)));
							arrows[k].setPoints([xarrow, yarrow, xarrow+ofsetx1, yarrow+ofsety1, xarrow+ofsetx2, yarrow+ofsety2]);

						}
					};
				}
			};
		}

	}
	// for (var i = 0; i < grafo.val.length; i++) {
	// 	//console.log(nodes[i].valor);
	// 	if(grafo.val[i][0] != nodes[i].valor){
	// 		console.log("aki")
	// 	} 
	// };
}

function setVertColor(layer, valor, color){
	var node = layer.get('.node');
	//console.log(node)
	for (var i = node.length - 1; i >= 0; i--) {
		if(node[i].valor == valor){
			var vert = node[i].get('.vertice')[0];
			console.log(color, vert)
			vert.setFill(color);
		}
	};
	layer.draw();
}

function setEdgeColor(layer, source, destiny, color){
	var edge = layer.get('.edge');
	var arrow = layer.get('.arrow');
	for (var i = edge.length - 1; i >= 0; i--) {
		if(edge[i].source == source && edge[i].destiny == destiny){
			//console.log("aki")
			edge[i].setStroke(color);
		}
		if(arrow.length > 0 && arrow[i].source == source && arrow[i].destiny == destiny){
			//console.log("aki")
			arrow[i].setFill(color);
		}
	};
	layer.draw();
}

function showAdj(layer, grafo, source, color){
	var viz = grafo.adj(source);
	//console.log(viz, source);
	for (var i = viz.length - 1; i >= 0; i--) {
		setVertColor(layer, viz[i], color);
		setEdgeColor(layer, source, viz[i], color);
	};
}

var addButton = true;
function onAddVert(v){
	addButton = v;
	//console.log("aki cara")
	//stage.on("mousedown", function(){
	var x, y;
	var canvas = document.getElementsByTagName("canvas");
	console.log(canvas[0]);
	var handler = function(e){
		if (!addButton) {
			console.log("aki");
			canvas[0].removeEventListener("mousedown", handler);
		}
		else{
			x = e.clientX;
			y = e.clientY;
			var valor = prompt("qual o valor do vertice?");
			addVert(g, valor, x, y);
			addButton = false;
			//alert("funcioou!!!!!"+x+y);	
		}
	}
	canvas[0].addEventListener("mousedown",handler, false);
	//console.log("aki");	
	//});
	
}

function addVert(grafo, valor, x, y){
	//console.log("funfou", valor, x, y, grafo.val);
	grafo.addVert(valor, x, y);
	drawVert(grafo, grafo.findVert(valor), layer, raio, node_color, text_color);
	layer.draw();
}
//adicionar nova aresta


var addEdgeButton = false;
var edgeOrigin = null;		
var edgeDestiny  = null;
function setEdgeOrigin(valor){
	edgeOrigin = valor;
	console.log("origem",edgeOrigin);
}
function setEdgeDestiny(valor){
	edgeDestiny = valor;
	//addEdge(grafo, edgeOrigin, edgeDestiny);
	console.log("destino",edgeDestiny);
}

function onAddEdge(grafo){
	writeMessage(layer, "Selecione o primeiro vertice");
	addEdgeButton = true;
}

var on_dijstra = false;
function onDijstra(){
	on_dijstra = true;
	//console.log("aki", on_dijstra);
}

var on_bellman = false;
function onBellman(){
	on_bellman = true;
}

var on_breadth = false;
function onBreadth(){
	on_breadth = true;
}

var on_deep = false;
function onDeep(){
	on_deep = true;
}

var on_top_sort = false;
function onTopSort(){
	on_top_sort = true;
}

var on_kruskal = false;
function onKruskal(){
	on_kruskal = true;
}

var on_adj = false;
function onAdj(){
	on_adj = true;
}

var on_rm_vert = false;
function onRmVert(){
	on_rm_vert = true;
}

var on_rm_edge = false;
function onRmEdge(){
	on_rm_edge = true;
}
