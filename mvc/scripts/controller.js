var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
        const c = {};

        // v.page1.tabs.change(function () {
        //     if (v.page1.tabs.text == 2) v.pages.go(v.page2, "down");
        // });

        // Or use HotSpots for lots of navigation
        // can simplify with a loop - see MVC example https://zimjs.com/mvc
        const hs = new HotSpots([
            {page:v.page1, rect:v.page1.logo, call:()=>{zog("clicking on hotspot")}},
            {page:v.page2, rect:v.page2.logo, call:()=>{v.pages.go(v.page1, "left");}},
            {page:v.page1, rect:v.page1.tabs.buttons[1], call:()=>{v.pages.go(v.page2, "down");}},
            {page:v.page2, rect:v.page2.tabs.buttons[0], call:()=>{v.pages.go(v.page1, "up");}},
        ]);
        hs.show();


        v.dial.on("change", ()=>{ // not chainable
            zog(v.dial.currentValue)
            m.data[0] = v.dial.currentValue;
            m.updateData();
        })

        v.dial.change(()=>{ // chainable
        })

        v.slider.on("change", ()=>{ // not chainable
            m.data[1] = v.slider.currentValue;
            m.updateData();
        })


        frame.on("resize", () => {

            v.manager.resize();

            stage.update();
        });

        return c;
    }
    return app; // module pattern
}(app||{}); // module pattern
