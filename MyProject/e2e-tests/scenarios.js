'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Calendar Application', function() {
  describe('calendarApp', function() {

     beforeEach(function() {
      browser.get('index.html');
      
    });
    // beforeEach(module('calendarApp'));
    
 it('should have a right title and text', function() {
     // expect(browser().location().href()).toEqual('http://localhost:8000/#/events')
    expect(browser.getTitle()).toEqual('Calendar App');
    expect(element(by.css('.navbar-brand')).getText()).toEqual('Calendar App');
 });

// it('should click on Views and then Month', function() {
//     var openViews = browser.findElement(By.xpath("//a[@href='#views']"));
//     openViews.click();

//     var tabs = element.all(by.css('.nav-tabs li'));
//     tabs.get(2).click();

//     });

it('should click on date picker', function() {
  var startDate = browser.findElement(By.id("startDate"));
  //var select = browser.findElement(By.xpath("html/body/div[3]/div[1]/table/tbody/tr[2]/td[3]")); 
   startDate.click();
    setTimeout(function(){
         
    }, 5000);  
   //select.click()
    //  var openViews = browser.findElement(By.xpath("//th[@text='#views']"));

    // /html/body/div[3]/div[1]/table/tbody/tr[2]/td[3]
 });

it('should click on name and type smth, add and check, update and check, delete and check', function() {
  var name = browser.findElement(By.id("name"));
  var description = browser.findElement(By.id("description"));
  var startDate = browser.findElement(By.id("startDate"));
  var startTime = browser.findElement(By.id("startTime"));
  var endTime = browser.findElement(By.id("endTime"));
  var endDate = browser.findElement(By.id("endDate"));
  var place = browser.findElement(By.id("place"));
  var add = browser.findElement(By.id("addEvent"));
  name.sendKeys("Events");
  description.sendKeys("Happy day");
  //Need to rewrite in click way
  startDate.sendKeys("07-02-2017");
  startTime.sendKeys("08:00");
  endTime.sendKeys("18:00");
  endDate.sendKeys("07-02-2017");
  place.sendKeys("Home");
  add.click(); 
  // var eventInList = browser.findElement(By.xpath("//*[@id='list']/tr/td[2]"));
  // expect(eventInList.getText()).toEqual('Events');

 var btnUpd = browser.findElement(By.xpath("//button[text()='update']"));
 btnUpd.click();
 name.sendKeys(" Updated");
 place.sendKeys(" Updated");
 add.click();
 var updEventInList = browser.findElement(By.xpath("//*[@id='list']/tr/td[2]"));
 expect(updEventInList.getText()).toEqual('Events Updated');

//  var btnDlt = browser.findElement(By.xpath("//button[text()='delete']"));
//  btnDlt.click();
//  // if (browser.findElement(By.xpath("//*[@id='list']")).size == 0){

//  // }


});



// it('should check added event in Year view', function() {
 
//     var openViews = browser.findElement(By.xpath("//a[@href='#views']"));
//     openViews.click();

//     var tabs = element.all(by.css('.nav-tabs li'));
//     tabs.get(2).click();

//     // var arrow = element(By.css('arrow'));
//     // arrow.click();

//  });

// it('should update name and place of event', function() {
    
//     var btnUpd = browser.findElement(By.xpath("//button[text()='update']"));
//     btnUpd.click();
//     var name = browser.findElement(By.id("name"));
//     //var valueOfName = name.getAttribute('value');
//     expect(name.getText()).toEqual('Event');


//  });

 // expect(element.all(by.model('events')).count()).toEqual(1);


    // var circle = browser.findElement(By.xpath("/html/body/div[1]/div[2]/section/div[1]/div/div[3]/div/div/div/div[4]/div[2]"));
    // circle.click();

    // expect(element(by.xpath('//h2')).getText()).toEqual('Event');


// it('should click on Month', function() {
//     // var openMonth = browser.findElement(By.xpath("//a[@ng-click='tab.setTab(2)']"));
//     // openMonth.click();

//  });


    
    //   });

    

    // beforeEach(function() {
    //   browser.get('index.html');
    // });

    // it('should filter the phone list as a user types into the search box', function() {
    //   var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
    //   var query = element(by.model('$ctrl.query'));

    //   expect(phoneList.count()).toBe(20);

    //   query.sendKeys('nexus');
    //   expect(phoneList.count()).toBe(1);

    //   query.clear();
    //   query.sendKeys('motorola');
    //   expect(phoneList.count()).toBe(8);
    // });

    // it('should be possible to control phone order via the drop-down menu', function() {
    //   var queryField = element(by.model('$ctrl.query'));
    //   var orderSelect = element(by.model('$ctrl.orderProp'));
    //   var nameOption = orderSelect.element(by.css('option[value="name"]'));
    //   var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

    //   function getNames() {
    //     return phoneNameColumn.map(function(elem) {
    //       return elem.getText();
    //     });
    //   }

    //   queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

    //   expect(getNames()).toEqual([
    //     'Motorola XOOM\u2122 with Wi-Fi',
    //     'MOTOROLA XOOM\u2122'
    //   ]);

    //   nameOption.click();

    //   expect(getNames()).toEqual([
    //     'MOTOROLA XOOM\u2122',
    //     'Motorola XOOM\u2122 with Wi-Fi'
    //   ]);
    // });
  });
  });


