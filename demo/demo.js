
function Component(type, pin) {
	
	this.type = type ? type: Component.prototype.types[0];

	if (pin) {
		this.pin = pin;		
	} else {
		this.pin = Component.prototype.lastPin++;		
	}
}

Component.prototype = {
	constructor: Component,
	types: [
		{name: 'Led', value: 'Led'},
		{name: 'Servo', value: 'Servo'},
		//{name: 'Accelerometer', value: 'Accelerometer'},
		//{name: 'Board', value: 'Board'},
		//{name: 'Button', value: 'Button'},
		//{name: 'Switch', value: 'Switch'},
		//{name: 'Compass', value: 'Compass'},
		//{name: 'Fn', value: 'Fn'},
		//{name: 'Gripper', value: 'Gripper'},
		//{name: 'Gyroscope', value: 'Gyroscope'},
		//{name: 'IR', value: 'IR'},
		//{name: 'LCD', value: 'LCD'},
		//{name: 'Led', value: 'Led'},
		//{name: 'LedControl', value: 'LedControl'},
		//{name: 'Joystick', value: 'Joystick'},
		//{name: 'Motor', value: 'Motor'},
		//{name: 'Nodebot', value: 'Nodebot'},
		//{name: 'Ping', value: 'Ping'},
		//{name: 'Pir', value: 'Pir'},
		//{name: 'Pin', value: 'Pin'},
		//{name: 'PWMServo', value: 'PWMServo'},
		//{name: 'Repl', value: 'Repl'},
		//{name: 'Sensor', value: 'Sensor'},
		//{name: 'Servo', value: 'Servo'},
		//{name: 'Stepper', value: 'Stepper'},
		//{name: 'ShiftRegister', value: 'ShiftRegister'},
		//{name: 'Sonar', value: 'Sonar'},
		//{name: 'Wii', value: 'Wii'}
	],

	type: null,
	pin: 0,
	lastPin: 13,
	isOn: false,
	angle: 90,

	toggle: function() {
		if (this.isOn) {
			this.j5Component.off();
		} else {
			this.j5Component.on();
		}
		this.isOn = !this.isOn;
	},

	setAngle: function() {
		this.j5Component.move(this.angle);
	},

};


var app = angular.module("JohnnyFiveDemo", []);
window.app = app;

app.controller("DemoCtrl", function($scope) {

	$scope.five = require("../");
	$scope.board = new $scope.five.Board();

	$scope.board.on("ready", function() {

		console.log("BOARD IS READY!");

		$scope.isConnected = true;
		$scope.$apply();

	});

	$scope.addComponent = function() {
		switch ($scope.newComponent.type.value) {
			case "Led":
				$scope.newComponent.j5Component = new $scope.five.Led($scope.newComponent.pin);
			break;
			case "Servo":
				$scope.newComponent.j5Component = new $scope.five.Servo($scope.newComponent.pin);
			break;
		}

		$scope.components.push($scope.newComponent);
		$scope.newComponent = new Component($scope.data.componentTypes[0]);
	};


	window.$scope = $scope;

	$scope.isConnected = false;
	$scope.longWait = false;
	$scope.components = [];

	//Retry info.
	setTimeout(function() {
		$scope.longWait = true;
		$scope.$apply();
	}, 6000);

	$scope.data = {
		componentTypes: Component.prototype.types
	}

	$scope.newComponent = new Component($scope.data.componentTypes[0]);



});