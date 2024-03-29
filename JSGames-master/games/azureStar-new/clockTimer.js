function ClockCounter() {
	this.timeCrono = '';
	this.hor = 0;
	this.min = 0;
	this.seg = 0;
	this.startTime;
	this.totalSec = 0;
	this.start;
	this.running = false;
};

ClockCounter.prototype.update = function () {
	if (this.seg + 1 > 59) {
		this.min+= 1 ;
	}
	if (this.min > 59) {
		this.min = 0;
		this.hor+= 1;
	}
	var time = new Date();
	if (time.getSeconds() >= this.start) {
		this.seg = time.getSeconds() - this.start;
	}
	else {
		this.seg = 60 + (time.getSeconds() - this.start);
	}
	this.timeCrono= ((this.min < 10) ? "0" : "") + this.min;
	this.timeCrono+= ((this.seg < 10) ? ":0" : ":") + this.seg;
	document.getElementById('timeCounter').innerText = this.timeCrono;
};

ClockCounter.prototype.startCronometer = function () {
	var self = this;
	this.startTime = new Date();
	this.start = this.startTime.getSeconds();
	this.update();
	this.running = true;
	var id = setInterval(function () {
		if (self.running){
			self.update();
			self.totalSec++;
		} else {
			clearInterval(id);
		}
	}, 1000);
};
