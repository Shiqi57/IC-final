var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        var stageW = stage.width;
        var stageH = stage.height;
        const v = {};

        STYLE = {
            type:{
                Tabs:{
                    width:160,
                    spacing:20,
                    currentSelected:false
                },
                Button:{
                    width:70,
                    height:70,
                    corner:35,
                    backgroundColor:purple,
                    rollBackgroundColor:pink,
                    label:"",
                    shadowBlur:-1
                }
            }
        }

        const manager = v.manager = new Manager();

        const page1 = v.page1 = new Container(stageW, stageH);
        let header = new Container().addTo(page1);
        v.page1.logo = new Label(m.title).addTo(header);
        let content = new Container(500, 500).addTo(page1);
        v.dial = new Dial().sca(2).center(content);
        v.dial.currentValue = m.data[0];

        let footer = v.page1.tabs = new Tabs({
            tabs:[
                new Button({
                    icon: pizzazz.makeIcon("home", "white").alp(.7),
                    rollIcon: pizzazz.makeIcon("home", "black")
                }),
                new Button({
                    icon: pizzazz.makeIcon("settings", "white").alp(.7),
                    rollIcon: pizzazz.makeIcon("settings", "black")
                })]
        }).addTo(page1);
        // footer.buttons[0].setIcon("icon", pizzazz.makeIcon("settings", "white"))

        manager.add(new Layout(page1, [
            {object:header, maxWidth:90, marginTop:5},
            {object:content, marginTop:2, backgroundColor:green},
            {object:footer, maxWidth:90, marginTop:2}
        ], 2, yellow, true, null, stage));

        const page2 = v.page2 = new Container(stageW, stageH);
        header = new Container().addTo(page2);
        v.page2.logo = new Label(m.title).addTo(header);
        content = new Container(500, 500).addTo(page2);
        v.slider = new Slider().sca(1.5).center(content);
        v.slider.currentValue = m.data[1];

        footer = v.page2.tabs = v.page1.tabs.clone().addTo(page2);
        manager.add(new Layout(page2, [
            {object:header, maxWidth:90, marginTop:5},
            {object:content, marginTop:2, backgroundColor:blue},
            {object:footer, maxWidth:90, marginTop:2}
        ], 2, yellow, true, null, stage));

        manager.add(v.pages = new Pages([
            {page:page1, swipe:[null, null, page2, page2]},
            {page:page2, swipe:[null, null, page1, page1]}
        ], "slide", 500).addTo());

        return v;

    }
    return app; // module pattern
}(app||{}); // module pattern
