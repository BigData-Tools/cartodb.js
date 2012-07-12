/**
 * Show a dropdown from the target
 *
 * It shows the several options of the user settings 
 *
 * usage example:
 *
 *    var settings = new cdb.ui.common.Dropdown({
 *        el: "#settings_element",
 *        speedIn: 300,
 *        speedOut: 200
 *    });
 *    // show it
 *    settings.show();
 *    // close it
 *    settings.close();
*/

cdb.ui.common.Dropdown = cdb.core.View.extend({

  tagName: 'div',
  className: 'dropdown',

  events: {
    "click ul>li>a" : "_fireClick"
  },

  default_options: {
    width: 160,
    speedIn: 150,
    speedOut: 300
  },

  initialize: function() {
    _.bindAll(this, "open", "hide", "_handleClick");

    // Extend options
    _.defaults(this.options, this.default_options);

    // Dropdown template
    this.template_base = cdb.templates.getTemplate(this.options.template_base);

    // Bind to target
    $(this.options.target).bind({"click": this._handleClick});

    // Is open flag
    this.isOpen = false;

  },

  render: function() {
    // Render
    var $el = this.$el;
    $el.html(this.template_base());
    return this;
  },

  _handleClick: function(ev) {
    //Check if the dropdown is visible to hiding with the click on the target
    if (ev){
      ev.preventDefault();
      ev.stopPropagation();
    }
    // If visible
    if (this.isOpen){
      this.hide();
    }else{
      this.open();
    }
  },

  hide: function() {
    var self = this;
    this.isOpen = false;
    this.$el.hide();
  },

  open: function() {
      
    this.isOpen = true;

    // Positionate
    var targetPos = $(this.options.target).offset()
      , targetWidth = $(this.options.target).outerWidth()
      , targetHeight = $(this.options.target).outerHeight()

    this.$el.css({
      top: targetPos.top + targetHeight + 10,
      left: targetPos.left + targetWidth - this.options.width + 15,
      width: this.options.width,
      display: "block",
      opacity: 1
    });
  },

  _fireClick: function(ev) {
    this.trigger("optionClicked", ev, this.el);
  }

});