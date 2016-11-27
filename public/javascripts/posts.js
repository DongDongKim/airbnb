/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
/*var RoomController = function() {
  function setAjaxHandler() {
    $( document ).ajaxStart(function() {
      $("#main").addClass("loading");
    }).ajaxStop(function() {
      $("#main").removeClass("loading");
    });
  }

  function checked(type, value) {
    var e = $("." + type + " .option[data-value='" + value + "']");
    return e.hasClass('selected');
  }

  var Constructor = function () {
    var self = this;
    setAjaxHandler();
    this.roomTemplate = _.template($("#room-template").html());
    this.load();
    $("#post-room").click(function() {
      self.postRoom();
    }.bind(this));
    $("section.options a.option")
    .addClass('selected')
    .click(function(e) {
      $(e.currentTarget).toggleClass('selected');
      self.render();
    });

    $("section.options a.all").click(function(e) {
      var section = $($(e.currentTarget).closest('section'));
      var options = section.find('.option');
      if (options.length === section.find('.option.selected').length) {
        options.removeClass('selected');
      } else {
        options.addClass('selected');
      }
      self.render();
    });
  };

  Constructor.prototype._visible = function(task) {
    if (!checked('done', task.done)) {
      return false;
    }
    if (!checked('priority', task.priority)) {
      return false;
    }
    /*if (_.includes(['개인', '가족', '업무'], task.category)) {
      if (!checked('category', task.category)) {
        return false;
      }
    } else if (!checked('category', '기타')) {
      return false;
    }*/
    return true;
  };

  Constructor.prototype.load = function() {
    var self = this;
    $.getJSON("/rooms", function(data) {
      self.tasks = data;
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.render = function() {
    var self = this;
    $("#main").toggleClass("no-task", (this.tasks.length <= 0));
    var html = _.map(this.tasks, function(task) {
      if (self._visible(task)) {
        task.doneStr = task.done ? 'done' : '';
        return self.taskTemplate(task);
      }
      return "";
    });
    $("ul.rooms").html(html.join("\n"));
    //$("ul.tasks .check").click(self.postDone.bind(this));
    //$(".task .remove").click(self.removeTask.bind(this));
  };

  Constructor.prototype.clearForm = function() {
    $("#form-room input").val("");
    $("#form-room select[name='fee']").val("");
    //$("#form-task select[name='priority']").val("2");
    $("#form-room input:first").focus();
  };

  Constructor.prototype._findRoom = function(e) {
    var el = $(e.currentTarget).closest('li');
    var id = el.data('id');
    return  _.find(this.tasks, {id: id});
  };

  Constructor.prototype.postDone = function(e) {
    var task = this._findTask(e);
    if (!task) {
      return;
    }
    var self = this;
    $.ajax({
      url: '/rooms/' + room.id,
      method: 'PUT',
      dataType: 'json',
      data: {
        done: task.done ? false : true
      },
      success: function(data) {
        room.done = data.done;
        self.render();
      }
    });
  };

  Constructor.prototype.postTask = function() {
    var self = this;
    $.post("/rooms", $("#form-room").serialize(), function(data) {
      console.log(data);
      self.rooms.push(data);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.removeTask = function(e) {
    var task = this._findRoom(e);
    if (!room) {
      return;
    }
    var self = this;
    if (confirm('정말로 삭제하시겠습니까?')) {
      $.ajax({
        url: '/rooms/' + task.id,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          self.rooms = _.reject(self.rooms, function(t) {
            return t.id === room.id;
          });
          var el = $(e.currentTarget).closest('li');
          el.remove();
        }
      });
    }
  };

  return Constructor;
} ();*/
