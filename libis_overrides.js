// Select
Select = function (id, options) {
	if (typeof options == "undefined") {
		options = {};
	}
	this.element = document.getElementById(id);
	this.disableOnEmpty = options.disableOnEmpty;
	this.emptyMessage = options.emptyMessage;
	this.helpMessage = options.helpMessage;
	this.preselectSingleton = options.preselectSingleton;
	this.clear = function () {
		// TODO: check if this is cross-browser
		this.element.length = 0;
	};
	this.addItem = function (item, select) {
		var option = document.createElement("option");
		if (typeof item.name === 'undefined') {
			option.text = item;
		} else {
			option.text = item.name;
		}
		option.item = item;
		// option.setAttribute('id', item.tag ? item.tag : item);
		if (select) { option.selected = true; }
		this.element.add(option);
	};
	this.prependMessage = function (caption, disabled) {
		var option = document.createElement("option");
		option.text = caption;
		if (disabled) {
			option.disabled = true;
		}
		option.selected = true;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			this.element.add(option, 0);
		} else {
			this.element.add(option, this.element.options[0]);
		}
	};
	this.finalize = function () {
		if (this.element.length == 0) {
			if (this.disableOnEmpty) { this.element.disabled = true; }
			if (this.inputMessage) { this.prependMessage(this.inputMessage, true); }
			if (this.emptyMessage) { this.prependMessage(this.emptyMessage); }
		} else {
			if (this.disableOnEmpty) { this.element.disabled = false; }
			if (this.preselectSingleton && this.element.length == 1) { this.element.options[0].selected = true; }
			if (this.inputMessage) { this.prependMessage(this.inputMessage, true); }
			if (this.helpMessage) { this.prependMessage(this.helpMessage); }
		}
	};
	this.getSelectedItem = function () {
		var index = this.element.selectedIndex;
		if (index != -1) {
			return this.element.options[index].item;
		} else {
			return null;
		}
	};
	this.setInput = function(value) {
		this.inputMessage = value;
	}
	this.getSelectedIndex = function() {
		return this.element.selectedIndex;
	}
	this.selectItem = function(index) {
		this.element.selectedIndex = index;
	}
};

