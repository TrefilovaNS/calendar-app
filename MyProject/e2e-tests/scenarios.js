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

    // it('should have a title', function() {
    // browser.get('http://localhost:8000/#/events');

    
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


