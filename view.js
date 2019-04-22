var app = function(app) {
    app.getView = function(data) {
        var view = {}; // store any objects used in other scripts in view object

        // PART 1 - ASSET CREATION AND CLASSES  ~~~~~~~~~~~~~~~~~~~~~~~~

        // var logo;
        // logoLoad = frame.loadAssets({font:"zekton", src:"zekton.ttf"}, "assets/");
        // logoLoad.on("complete", function() {
        //     var logoBacking = new Label({
        //         text:"CARBOON",
        //         font:"zekton",
        //         color:frame.pink,
        //         size:80
        //     }).pos(42,210,stage).ske(0,-25).alp(.1).bot();
        //     logo = logoBacking.clone().addTo().alp(.7).mov(20,10).bot();
        // });

        // // panel to collect carboon score
        // var panelC = new Container(270, 60);
        // var backing = new Rectangle(panelC.width, panelC.height, frame.black).addTo(panelC);
        // panelC.sca(.9).pos(730, 70, stage).ske(0,25);
        // var label = new Label({text:"Carboon", color:frame.grey}).center(panelC).pos(20);
        // view.carboonScore = new Label({text:"0", align:"right", backgroundColor:frame.blue, color:frame.white}).alp(.75).center(panelC).pos(270-10);

        // // panel to collect antigrav amount
        // var panelA = new Container(370, 60).pos(stageW-370-30, 100, stage).ske(0,25);
        // var backing = new Rectangle(panelA.width, panelA.height, frame.black).addTo(panelA);
        // var label = new Label({text:"AntiGrav", color:frame.grey}).center(panelA).pos(20);
        // view.antigravBar = new Indicator({
        //     width:200,
        //     height:50,
        //     num:5,
        //     fill:true,
        //     color:frame.pink,
        //     offColor:frame.dark,
        //     shadowColor:-1
        // }).center(panelA).pos(370-200-10);

        // // BOARD
        // // this will be abstracted into the ZIM game.js module
        // view.Board = function(tileSize, tileNum, tileColor, tileLabels) {
        //     this.super_constructor();
        //     this.type = "Board";
        //     var container = new Container(tileSize, tileSize);
        //     new Rectangle(tileSize,tileSize,tileColor,frame.darker,2).addTo(container);
        //     // labels for debugging
        //     if (tileLabels) new Label({text:"", color:frame.white, align:"center", valign:"center"}).center(container);
        //     // old way with no labels for debugging
        //     // tiles = this.tiles = new Tile(new Rectangle(tileSize,tileSize,frame.dark,frame.darker,2).centerReg(), tileNum, tileNum)
        //     tiles = this.tiles = new Tile(container.centerReg(), tileNum, tileNum)
        //         .rot(45)
        //         .center(this)
        //     this.sca(2,1);
        //     tiles.loop(function(t) {t.mouseChildren = false;})
        // }
        // extend(view.Board, Container);

        // view.Saucer = function() {
        //     this.super_constructor();
        //     this.type = "Saucer";
        //     this.moves = 0;
        //     var upper = this.upper = new Container().addTo(this);
        //     var light = this.light = new Circle(40, frame.white).sca(1,.5).addTo(this);
        //     this.centerReg(null,null,false);
        //     // had built saucer without making upper container for animating scaleY
        //     // so below is just to recreate same arrangement in container
        //     // then fakelight is removed - too lazy to recode positions
        //     // and it is complicated with registration point in center of light
        //     var fakeLight = light.clone().addTo(upper);
        //     upper.centerReg(null,null,false);
        //     var disc = new Circle(40, frame.silver).sca(1,.5).addTo(upper).mov(0, -400);
        //     var top = new Circle(30, frame.grey).sca(1,.3).addTo(upper).mov(0, -407);
        //     var tri = new Triangle(null,null,null,frame.white).alp(.2).center(upper, 1).siz(80, 400);
        //     fakeLight.removeFrom();
        //     upper.animate({props:{scaleY:1.02}, time:1300, loop:true, rewind:true})
        //     this.proportion = new Proportion(0, stageH, .7, 1.1); // for scaling based on height
        // }
        // extend(view.Saucer, Container);

        view.Person = function(shirt, pants, head, player) {
            var colors = shuffle([frame.pink, frame.blue, frame.yellow, frame.green, frame.tin, frame.light, frame.purple, frame.orange]);
            var heads = shuffle([frame.brown, "peru", "saddlebrown", "sandybrown", "wheat", "bisque", "rosybrown", "tan"])
            if (zot(shirt)) shirt = colors[0];
            if (zot(pants)) pants = colors[1];
            if (zot(head)) head = heads[0];
            if (zot(player)) player = false;
            this.super_constructor();
            this.type = player?"Me":"Person";
            var feet = new Circle(12, pants).sca(1,.5).addTo(this);
            this.centerReg(null,null,false).mov(0,80-25/.707); // 45 degee shadow
            this.carboon = 0;
            this.antigrav = 0;
            var bot = new Rectangle(24,18,pants).pos(-12,-18,this);
            var belt = new Circle(12, shirt, "rgba(0,0,0,.3)",2).sca(1,.5).pos(0,-18,this);
            var top = new Rectangle(24,10,shirt).pos(-12,-28,this);
            var neck = new Circle(12, shirt).sca(1,.5).pos(0,-28,this);
            var head = new Circle(12, head).pos(0,-40,this);
            this.cache();
            this.proportion = new Proportion(0, stageH, .8, 1.3);
            view.Person.people.add(this);
        }
        view.Person.people = new Dictionary(); // to keep track and add and remove people
        extend(view.Person, Container);

        // view.Carboon = function() {
        //     this.super_constructor();
        //     this.type = "Carboon";
        //     var ball = new Circle(16, frame.green)
        //         .alp(.9)
        //         .sca(1,1)
        //         .addTo(this)
        //         .animate({obj:{alpha:0}, time:1000, loop:true, rewind:true});
        //     var ball = new Circle(7, frame.darker).sca(1,1).addTo(this);
        //     this.centerReg(null,null,false).reg(0,2);
        //     this.proportion = new Proportion(0, stageH, .8, 1.3);
        // }
        // extend(view.Carboon, Container);

        // view.AntiGrav = function() {
        //     this.super_constructor();
        //     this.type = "AntiGrav";
        //     startRings = false; // rings all stay for one saucer move
        //     var ring = new Circle(10, frame.faint, frame.white, 2).sca(1,.5).addTo(this);
        //     var ring = new Circle(20, frame.faint, frame.white, 2).sca(1,.5).addTo(this);
        //     var ring = new Circle(30, frame.faint, frame.white, 2).sca(1,.5).addTo(this);
        //     this.centerReg(null,null,false).reg(0,2);
        //     this.proportion = new Proportion(0, stageH, .8, 1.3);
        //     this.removeRing = function() {
        //         if (startRings) {
        //             this.removeChild(this.getChildAt(this.numChildren-1));
        //             if (this.numChildren == 0) {
        //                 objects.splice(objects.indexOf(this), 1);
        //                 this.removeFrom();
        //                 data.boardData[this.row][this.col] = "x";
        //                 antigravs.splice(antigravs.indexOf(this), 1);
        //             }
        //         } else {
        //             startRings = true;
        //         }
        //     }
        //     antigravs.push(this);
        // }
        // extend(view.AntiGrav, Container);

        // view.Tree = function() {
        //     this.super_constructor();
        //     this.type = "Tree";
        //     var roots = new Circle(10, frame.brown).sca(1,.5).addTo(this);
        //     this.centerReg(null,null,false);
        //     var trunk = new Rectangle(20,50,frame.brown).pos(-10,-50,this);
        //     var leaves1 = new Circle(rand(35,45), frame.green).sca(1,.65).pos(0,-50,this);
        //     var leaves2 = new Circle(rand(20,30), frame.green).sca(1,1).pos(-5,-70,this);
        //     var leaves3 = new Circle(rand(15,20), frame.green).sca(1,1).pos(12,-72,this);
        //     this.proportion = new Proportion(0, stageH, .8, 1.3);
        //     this.alpha = .9;
        //     this.cache();
        // }
        // extend(view.Tree, Container);

        // PART 2 - VIEW OBJECT FUNCTIONS  ~~~~~~~~~~~~~~~~~~~~~~~~

        // when functions are stored on object they are not hoisted
        // so they are placed above the object creation which needs to call these functions
        // the functions are also called from other scripts

        // MOVEMENT
        // moveTo either places (if animate is false) or moves an object
        // when moving, if the object is the saucer it checks if hitting tree or person
        // if so it replaces the object with another
        // If the moving object is a person then it checks to see if it is hitting the saucer
        // this keeps track of:
        // 1. row and col properties of the object
        // 2. the positions in the data.boardData
        //      old tiles set at start of animation
        //      new tile set at end of animation
        // 3. the objects in the objects array
        // 4. removes objects from and adds objects to gameElements
        // 5. the state of AI path and timeout step calls if needed

        // object, row, column, animate
        // view.moveTo = function(obj, i, j, animate) {
        //     obj.lastCol = obj.col;
        //     obj.lastRow = obj.row;
        //     if (!animate || obj.type == "Saucer") {
        //         // set at start of moving for saucer so other paths know saucer will be there
        //         // other objects set current row and col when they arrive at the square
        //         obj.col = i;
        //         obj.row = j;
        //         if (zot(obj.lastRow)) {
        //             obj.lastCol = obj.col;
        //             obj.lastRow = obj.row;
        //         }
        //     }
        //     if (zot(animate)) animate = true;
        //     var currentTile = data.getTile(tiles,i,j);
        //     var point = data.getTileGlobalPoint(tiles,currentTile);
        //     if (animate) {
        //         if (!zot(obj.lastRow)) {
        //             // set the tile the object is leaving to x unless it is a special tile
        //             // the saucer leaves the carboon but a person collects the carboon so does not
        //             var specialCondition = obj.type == "Saucer"?(obj.lastItem=="a"||obj.lastItem=="c"):(obj.lastItem=="a");
        //             data.boardData[obj.lastRow][obj.lastCol] = specialCondition?obj.lastItem:"x";
        //         }

        //         // set the ticker to animate the depth for this object as it moves
        //         if (obj.animateTicker) Ticker.remove(obj.animateTicker);
        //         obj.animateTicker = Ticker.add(function(){view.setDepth(obj)});

        //         obj.animate({
        //             override:false,
        //             obj:{x:point.x, y:point.y},
        //             time:500,
        //             call:function(target) { // animation to new tile is finished
        //                 if (target.type != "Saucer") { // saucer was already set at the start of move
        //                     obj.col = i;
        //                     obj.row = j;
        //                     if (zot(obj.lastRow)) {
        //                         obj.lastCol = obj.col;
        //                         obj.lastRow = obj.row;
        //                     }
        //                 }
        //                 Ticker.remove(target.animateTicker);
        //                 if (target.type == "Saucer") {
        //                     saucer.moves++;
        //                     if (saucer.moves%2==0) loop(antigravs, function(ant) {ant.removeRing();}, true);
        //                     var hitResult = gameElements.loop(function(hitObj) {
        //                         if (hitObj == saucer) return;
        //                         if (saucer.light.hitTestReg(hitObj)) {
        //                         // if (saucer.row==hitObj.row && saucer.col==hitObj.col) {
        //                             if (hitObj.type == "Tree") {
        //                                 saucer.eatingTree = true;
        //                                 hitObj.animate({
        //                                     obj:{scale:.2},
        //                                     time:400,
        //                                     ease:"backIn",
        //                                     call:function(target2) { // end of tree eating
        //                                         // remove tree add carboon
        //                                         target2.removeFrom();
        //                                         var carboon = new view.Carboon().addTo(gameElements).bot();
        //                                         carboon.col = i; carboon.row = j;
        //                                         objects.splice(objects.indexOf(target2), 1, carboon);
        //                                         obj.lastItem = "c";
        //                                         // data.boardData[target2.row][target2.col] = "c";
        //                                         view.moveTo(carboon, target2.col, target2.row, false)
        //                                             .top()
        //                                             .alp(0)
        //                                             .animate({
        //                                                 obj:{alpha:1},
        //                                                 time:300,
        //                                                 call:function(target3){
        //                                                     target3.top();
        //                                                 }
        //                                             });
        //                                         stage.update();
        //                                     }
        //                                 });
        //                             } else if (hitObj.type == "Person" || hitObj.type == "Me") {
        //                                 abduct(hitObj);
        //                             }
        //                             return true;
        //                         } // end hitTest
        //                     }); // end loop
        //                     if (!hitResult) {
        //                         obj.lastItem = data.boardData[j][i]; // so we can put special items back after leaving
        //                         data.boardData[j][i] = "s";
        //                     }
        //                 } else if (obj.type == "Person" || obj.type == "Me") {
        //                     // if (saucer.row==obj.row && saucer.col==obj.col) {
        //                     if (saucer.light.hitTestReg(obj)) {
        //                         abduct(obj);
        //                     } else {
        //                         if (data.boardData[j][i] == "c") { // collect carboon
        //                             gameElements.loop(function(el){
        //                                 if (el.type=="Carboon" && el.col==i && el.row==j) {
        //                                     objects.splice(objects.indexOf(el), 1);
        //                                     el.removeFrom();
        //                                 }
        //                             },true);
        //                             obj.carboon++;
        //                             if (obj.type == "Me") {
        //                                 view.carboonScore.text = obj.carboon;
        //                             }
        //                         }
        //                         if (obj.type=="Me" && data.boardData[j][i] == "a") {
        //                             gameElements.loop(function(el){
        //                                 if (el.type=="AntiGrav" && el.col==i && el.row==j) {
        //                                     objects.splice(objects.indexOf(el), 1);
        //                                     el.removeFrom();
        //                                     if (el && el.numChildren>0) {
        //                                         obj.antigrav+=el.numChildren;
        //                                         view.antigravBar.selectedIndex = Math.min(4, obj.antigrav-1);
        //                                         obj.antigrav = view.antigravBar.selectedIndex+1;
        //                                     }
        //                                 }
        //                             },true);
        //                             obj.carboon++;
        //                             if (obj.type == "Me") {
        //                                 view.carboonScore.text = obj.carboon;
        //                             }
        //                         }
        //                         obj.lastItem = data.boardData[j][i];
        //                         data.boardData[j][i] = obj.type=="Me"?"m":"p";
        //                     }
        //                 }
        //             } // end call after object animates (saucer, people, me)
        //         }); // end animate
        //     } else {
        //         obj.pos(point.x, point.y);
        //         view.setDepth(obj);
        //     }
        //     return obj;
        // }

        // // ABDUCT - called by hitTest in moveTo()
        // // done both if saucer hits person or person hits saucer
        // // GLITCH - if they both move to each other this happens twice
        // function abduct(person) {
        //     person.top();
        //     if (person.type == "Me") {
        //         if (person.antigrav > 0) {
        //             person.antigrav--;
        //             view.antigravBar.selectedIndex = person.antigrav-1;
        //             data.boardData[person.row][person.col] = "x";
        //             data.boardData[saucer.row][saucer.col] = "s";
        //             saucer.lastItem = "x";
        //             return;
        //         }
        //     }
        //     // clear AI tracking of person
        //     saucer.abducting = true;
        //     person.abducted = true;
        //     if (person.ticker) Ticker.remove(person.ticker);
        //     if (person.AI) person.AI.cancelPath(person.personPath);
        //     if (person.timeout) person.timeout.clear();
        //     person.top();
        //     data.boardData[person.row][person.col] = "x";
        //     data.boardData[saucer.row][saucer.col] = "s";
        //     saucer.lastItem = "a";
        //     if (person.type == "Me") {
        //         timeout(500, function(){data.clearColors(view.tiles)});
        //         if (saucer.ticker) Ticker.remove(saucer.ticker);
        //         if (saucer.AI) saucer.AI.cancelPath(saucer.personPath);
        //         if (saucer.timeout) saucer.timeout.clear();
        //         // end of game
        //         foil.addTo().top().animate({
        //             wait:5000,
        //             props:{alpha:1},
        //             call:function(target){
        //                 logo.top()
        //                     .alp(0)
        //                     .animate({
        //                         wait:300,
        //                         props:{alpha:.7, scale:2, skewY:0, x:140, y:310},
        //                         time:600,
        //                         call:function(){
        //                             logo.cur();
        //                             stage.on("stagemousedown", function() {
        //                                 logo.animate({props:{alpha:0}, call:function(){zgo("index.html");}});
        //                             });
        //                         }
        //                     });
        //             }
        //         }); // end foil animate
        //     } // end me check
        //     person.animate({
        //         obj:{rotation:360*rand(2,4,true,true), regY:"-30", y:"-350", scale:.2, alpha:0},
        //         time:rand(data.stepTime, data.stepTime*1.5),
        //         ease:"linear",
        //         call:function(target2){
        //             // remove person add antigrav
        //             target2.removeFrom();
        //             var antigrav = new view.AntiGrav().addTo(gameElements);
        //             objects.splice(objects.indexOf(target2), 1, antigrav);
        //             view.moveTo(antigrav, saucer.col, saucer.row, false)
        //                 .alp(0)
        //                 .animate({
        //                     obj:{alpha:1},
        //                     time:300,
        //                     call:function(target3){
        //                         saucer.abducting = false; // pauses saucer movement in index
        //                     }
        //                 });
        //             stage.update();
        //         }
        //     }); // end animate person
        } // end abduct

        // DEPTH SORT
        // generally y sorted but saucer should go under something on same level
        // and abducted person should stay on top
        // also, after sort all AntiGravs are put to bottom
        view.setDepth = function(mover) {
            if (mover) mover.sca(mover.proportion.convert(mover.y));
            if (zot(objects)) return;
            objects.sort(function(a,b) {
                if ((a==saucer||b==saucer) && Math.floor(a.y) == Math.floor(b.y)) {
                    if (a==saucer) return -1;
                    if (b==saucer) return 1;
                }
                if (a.abducted) return 1;
                if (b.abducted) return -1;
                return a.y - b.y;
            });
            if (data.tileLabels) {
                loop(data.tileNum, function(j){ // row
                    loop(data.tileNum, function(i){ // col
                        data.getTile(tiles,i,j).getChildAt(1).text = data.boardData[j][i];
                    });
                });
            }
            loop(objects, function(obj) {
                obj.addTo(gameElements);
                if (obj.type == "AntiGrav") obj.bot();
            });
        }


        // PART 3 - OBJECT CREATION  ~~~~~~~~~~~~~~~~~~~~~~~~

        var board = view.board = new view.Board(data.tileSize, data.tileNum, data.tileColor, data.tileLabels).center().mov(0,80);
        var tiles = view.tiles = board.tiles;
        var gameElements = view.gameElements = new Container(stageW, stageH).addTo();
        var antigravs = [];

        // MAKE GAME OBJECTS
        // loop through data and make and add game objects
        loop(data.boardData, function(row, j) {
            loop(row, function(type, i) {
                if (type=="t") {
                    view.moveTo(new view.Tree().sca(rand(.7,.9)).addTo(gameElements), i, j, false);
                }  else if (type=="p") {
                    var person = new view.Person().sca(rand(.7,.9)).addTo(gameElements)
                    person.destination = data.getEmptyTile();
                    view.moveTo(person, i, j, false);
                }  else if (type=="m") {
                    var me = view.me = new view.Person(frame.black, frame.black, frame.brown, true).sca(rand(.7,.9)).addTo(gameElements)
                    view.moveTo(me, i, j, false);
                }
            });
        });

        var saucerStart = data.getEmptyTile(null, [5,6,7]); // in bottom three rows
        var saucer = view.saucer = view.moveTo(new view.Saucer().addTo(gameElements), saucerStart[0], saucerStart[1], false);
        data.boardData[saucer.row][saucer.col] = "s";

        // POPULATE SORTING ARRAY
        // the objects are sorted by depth
        var objects = [];
        function collectObjects() {
            objects = [];
            gameElements.loop(function(obj) {objects.push(obj);});
        }
        collectObjects();

        view.setDepth();

        // fade in rect
        var foil = new Rectangle(stageW, stageH).addTo().animate({
            wait:500,
            props:{alpha:0},
            call:function(target){target.removeFrom();}
        });

        return view; // return the view object
    }
    return app;
}(app || {}); // module pattern