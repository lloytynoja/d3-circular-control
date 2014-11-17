describe("CircularSlide", function() {
  var control;

  beforeEach(function() {
    control = d3.circularSlide();
  });

  describe("all public get/set methods separately", function() {
    it("decimals ", function() {
      expect(control.decimals()).toEqual(0);
      control.decimals(1);
      expect(control.decimals()).toEqual(1);
    });
    it("handleDiameter", function() {
      expect(control.handleDiameter()).toEqual(20);
      control.handleDiameter(25);
      expect(control.handleDiameter()).toEqual(25);
    });
    it("handleInnerColor", function() {
      expect(control.handleInnerColor()).toEqual("yellow");
      control.handleInnerColor("green");
      expect(control.handleInnerColor()).toEqual("green");
    });
    it("handleStrokeColor", function() {
      expect(control.handleStrokeColor()).toEqual("orange");
      control.handleStrokeColor("black");
      expect(control.handleStrokeColor()).toEqual("black");
    });
    it("handleStrokeThickness", function() {
      expect(control.handleStrokeThickness()).toEqual(10);
      control.handleStrokeThickness(20);
      expect(control.handleStrokeThickness()).toEqual(20);
    });
    it("nullAngle", function() {
      expect(control.nullAngle()).toEqual(0);
      control.nullAngle(10);
      expect(control.nullAngle()).toEqual(10);
    });
    it("nullAreaColor", function() {
      expect(control.nullAreaColor()).toEqual("#3D3D3D");
      control.nullAreaColor("#3D3D2D");
      expect(control.nullAreaColor()).toEqual("#3D3D2D");
    });
    it("readingColor", function() {
      expect(control.readingColor()).toEqual("#616161");
      control.readingColor("#FFFFFF");
      expect(control.readingColor()).toEqual("#FFFFFF");
    });
    it("readingSize", function() {
      expect(control.readingSize()).toEqual("150px");
      control.readingSize("10px");
      expect(control.readingSize()).toEqual("10px");
    });    
    it("scaleFill", function() {
      expect(control.scaleFill()).toEqual("#FFFFF7");
      control.scaleFill("#000000");
      expect(control.scaleFill()).toEqual("#000000");
    });
    it("scaleStrokeWidth", function() {
      expect(control.scaleStrokeWidth()).toEqual(25);
      control.scaleStrokeWidth(15);
      expect(control.scaleStrokeWidth()).toEqual(15);
    });
    it("select", function() {
      expect(control.select()).toBeUndefined();
      control.select("#circular-control");
      expect(control.select()).toEqual("#circular-control");
    });
    it("size", function() {
      expect(control.size()).toBeUndefined();
      control.size(500);
      expect(control.size()).toEqual(500);
    });
    it("val", function() {
      expect(control.val()).toEqual("");
      control.val(1);
      expect(control.val()).toEqual(1);
    });
    it("valueRangeMin", function() {
      expect(control.valueRangeMin()).toBeUndefined("");
      control.valueRangeMin(333);
      expect(control.valueRangeMin()).toEqual(333);
    });
    it("valueRangeMax", function() {
      expect(control.valueRangeMin()).toBeUndefined("");
      control.valueRangeMin(222);
      expect(control.valueRangeMin()).toEqual(222);
    });

  });

  describe("all public methods chained", function() {
    it("all chained, set and get values", function() {
      control.select("#circular")
        .decimals(2)
        .handleDiameter(40)
        .handleInnerColor("#FFF000")
        .handleStrokeColor("#000FFF")
        .handleStrokeThickness(10)
        .nullAngle(30)
        .nullAreaColor("orange") 
        .size(500)
        .scaleFill("black")
        .scaleStrokeWidth(50)
        .readingColor("blue")
        .readingSize("160px")
        .val(100)
        .valueRangeMin(0)
        .valueRangeMax(200);

      expect(control.select()).toEqual("#circular");
      expect(control.decimals()).toEqual(2);
      expect(control.handleDiameter()).toEqual(40);
      expect(control.handleInnerColor()).toEqual("#FFF000");
      expect(control.handleStrokeColor()).toEqual("#000FFF");
      expect(control.handleStrokeThickness()).toEqual(10);
      expect(control.nullAngle()).toEqual(30);
      expect(control.nullAreaColor()).toEqual("orange");
      expect(control.size()).toEqual(500);
      expect(control.scaleFill()).toEqual("black");
      expect(control.scaleStrokeWidth()).toEqual(50);
      expect(control.readingColor()).toEqual("blue");
      expect(control.readingSize()).toEqual("160px");     
      expect(control.val()).toEqual(100);
      expect(control.valueRangeMin()).toEqual(0);
      expect(control.valueRangeMax()).toEqual(200);
    });
  });
});