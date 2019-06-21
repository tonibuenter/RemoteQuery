var rQ = {};

(function() {

  //
  // ELEMENT FUN -start-
  //
  function elementFun(ele, firstClass) {
    return function(arg0, arg1) {
      var ele$;

      if (_.isObject(arg0)) {
        ele$ = $('<' + ele + '>', arg0);
      } else {
        ele$ = $('<' + ele + '>');
      }

      if (_.isObject(arg1)) {
        ele$.css(arg1);
      }

      if (!_.isObject(arg0) && !_.isUndefined(arg0)) {
        if (_.isUndefined(arg1) && firstClass) {
          ele$.addClass(arg0);
        } else {
          ele$.text(arg0);
        }
      }

      if (!_.isObject(arg1) && !_.isUndefined(arg1)) {
        ele$.addClass(arg1);
      }
      return ele$;
    }
  }

  rQ.div = elementFun('div', true);

  rQ.span = elementFun('span');
  rQ.cite = elementFun('cite');
  rQ.pre = elementFun('pre');
  rQ.i = elementFun('i');
  rQ.a = elementFun('a');

  rQ.ul = elementFun('ul', true);
  rQ.ol = elementFun('ol', true);
  rQ.li = elementFun('li');

  rQ.img = elementFun('img', true);

  rQ.h1 = elementFun('h1');
  rQ.h2 = elementFun('h2');
  rQ.h3 = elementFun('h3');
  rQ.h4 = elementFun('h4');
  rQ.h5 = elementFun('h5');
  rQ.h6 = elementFun('h6');

  rQ.table = elementFun('table', true);
  rQ.thead = elementFun('thead', true);
  rQ.tbody = elementFun('tbody', true);
  rQ.tr = elementFun('tr', true);
  rQ.td = elementFun('td');

  rQ.form = elementFun('form', true);
  rQ.input = elementFun('input', true);
  rQ.label = elementFun('label');
  rQ.textarea = elementFun('textarea', true);
  rQ.select = elementFun('select', true);
  rQ.option = elementFun('option');

  rQ.section = elementFun('section', true);
  rQ.nav = elementFun('nav', true);

  // ELEMENT FUN -end-

  //
  // TEMPLATE UI -start-
  //
  /**
   * @memberOf rQ
   */
  function templateUi(settings) {
    settings = settings || {};
    var ui, view$;
    var name, id, cx;
    var callbacks = {};

    name = settings.name;

    view$ = settings.view$ || settings.view || rQ.div();

    ui = {
      'id' : function(arg0) {
        if (_.isString(arg0)) {
          id = arg0;
          view$.attr('id', id);
          return ui;
        } else {
          return id;
        }
      },
      'view' : function(arg0) {
        if (_.isObject(arg0)) {
          view$ = arg0;
          return ui;
        }
        return view$;
      },
      'hide' : function() {
        view$.hide.apply(view$, arguments);
        return ui;
      },
      'show' : function() {
        view$.show.apply(view$, arguments);
        return ui;
      },
      'name' : function(arg) {
        if (_.isString(arg)) {
          name = arg;
          return ui;
        }
        return name;
      },
      'destroy' : function() {
        view$.remove();
        view$ = undefined;
      },
      'disable' : _.noop,
      'select' : function(arg0) {
        return handleCallback('select', arg0);
      },
      'change' : function(arg0) {
        return handleCallback('change', arg0);
      },
      'done' : function(arg0) {
        return handleCallback('done', arg0);
      },
      'action' : function(arg0) {
        return handleCallback('action', arg0);
      },
      'size' : function() {
        return view$.length;
      },
      'context' : function(arg0) {
        if (!_.isUndefined(arg0)) {
          cx = arg0;
        }
        return cx;
      },
      'editable' : function(arg0) {
        return rQ.handleDisabledAttr(view$, arg0);
      },
      'label' : _.noop,
      'value' : _.noop,
      'data' : _.noop
    };
    return ui;

    function handleCallback(name, fun) {
      if (_.isFunction(fun)) {
        callbacks[name] = fun;
      } else {
        if (_.isFunction(callbacks[name])) {
          callbacks[name].apply(this, arguments);
        }
      }
      return ui;
    }

  }
  rQ.ui = templateUi;

  // TEMPLATE UI -end-

  //
  // INPUT UI -start-
  //
  /**
   * @memberOf rQ_ui_md
   */
  function inputUi(settings) {

    settings = settings || {};
    var ui, view$, input$, label$, icon$, id, isTextarea;
    //
    isTextarea = settings.isTextarea;
    //
    ui = rQ.ui();
    view$ = ui.view().addClass('input-field');
    input$ = isTextarea ? rQ.textarea('', 'materialize-textarea') : rQ
        .input();
    label$ = rQ.label();
    id = rQ_base.newId();
    label$.attr('for', id);
    input$.attr('id', id);
    input$.attr('type', settings.type || 'text').css('color', 'black');
    if (settings.name) {
      input$.attr('name', settings.name);
    }
    if (settings.active) {
      window.setTimeout(function() {
        input$.trigger('autoresize');
        label$.addClass('active');
      }, 0);
    }
    label$.text(settings.label).css('color', 'gray');
    if (settings.icon) {
      icon$ = rQ.i(settings.icon, 'material-icons prefix');
      view$.append(icon$);
    }
    view$.append(input$, label$);

    if (!isTextarea) {
      input$.keypress(function(e) {
        var code;
        if (e) {
          code = (e.keyCode ? e.keyCode : e.which);
        } else {
          code = 13;
        }
        if (code == 13) {
          e.preventDefault();
          ui.action(input$.text());
        }
        ui.change(input$.text());
      });
    }
    if (settings.css) {
      input$.css(settings.css);
    }

    ui.input$ = input$;
    ui.value = value;
    ui.editable = editable;

    return ui;

    function editable(is) {
      if (!is || is === 'false') {
        input$.attr('disabled', 'disabled');
        input$.css('color', 'gray');
      } else {
        input$.removeAttr('disabled');
        input$.css('color', 'black');
      }
    }

    function value(arg0) {
      if (!_.isUndefined(arg0)) {
        input$.val(arg0);
        window.setTimeout(function() {
          input$.trigger('autoresize');
          label$.addClass('active');
        }, 1);
      }
      return input$.val();
    }

  }
  rQ.inputUi = inputUi;

  // INPUT UI -end-

  //
  // TEXTAREA UI -start-
  //
  /**
   * @memberOf rQ_ui_md
   */
  function textareaUi(settings) {
    settings = settings || settings;
    settings.isTextarea = true;
    return inputUi(settings);
  }
  rQ.textareaUi = textareaUi;

  // TEXTAREA UI -end-

  //
  // BUTTON UI -start-
  //
  /**
   * @memberOf rQ_ui_md
   */
  function buttonUi(label, cb) {
    var ui, a$, disabled;

    a$ = rQ.a().attr('href', '#').text(label).click(_action);
    a$.addClass('waves-effect waves-green btn');
    ui = rQ.ui({
      'view' : a$
    });

    cb = cb || _.noop;
    ui.disable = disable;
    return ui;

    function _action() {
      if (!disabled) {
        cb.apply(this, arguments);
      }
    }

    function disable(arg0) {
      if (_.isUndefined(arg0)) {
        return disabled;
      }
      if (arg0) {
        disabled = true;
        a$.addClass('disabled');
      } else {
        disabled = false;
        a$.removeClass('disabled');
      }
      return ui;
    }
  }
  rQ.buttonUi = buttonUi;

  // BUTTON UI -end-

  //
  // BUTTON -start-
  //
  /**
   * @memberOf rQ_ui_md
   */
  function button(label, cb) {
    var a$ = rQ.a().attr('href', '#').text(label).click(cb);
    a$.addClass('waves-effect waves-green btn');
    return a$;
  }
  rQ.button = button;

  // BUTTON -end-

  //
  // TINYMCE UI
  //
  /**
   * @memberOf rQ
   */
  function tinymceUi(settings) {

    settings = settings || {};

    var ui, view$, ed, id, currentValue;

    ui = rQ.ui();

    view$ = ui.view();

    id = 'tinymce' + rQ_base.newId();

    view$.attr('id', id);

    setTimeout(
        function() {
          var tmp;
          tmp = new tinymce.Editor(
              id,
              {
                // selector : '#myTextarea',
                theme : 'modern',
                // width : 600,
                height : 300,
                'plugins' : settings.plugins
                    || [
                        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                        'save table contextmenu directionality emoticons template paste textcolor' ],
                // content_css : 'css/content.css',
                'toolbar' : settings.toolbar
                    || 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview fullpage | forecolor backcolor emoticons'
              }, tinymce.EditorManager);

          tmp.render();
          ed = tmp;
          // ui.value(currentValue);
        }, 0);

    ui.value = function(arg) {
      if (arg) {
        currentValue = arg;
        view$.html(arg);
      } else {
        return currentValue = ed.getContent();
      }
    }

    return ui;

  }
  rQ.tinymceUi = tinymceUi;

  // TINYMCE UI

  //
  // TINYMCE EDITOR UI
  //
  /**
   * @memberOf rQ_ui_md
   */
  function tinymceEditorUi(settings) {

    var ui, view$, ed, idEditor, idToolbar, currentValue;
    var toolbar$, editor$;

    ui = rQ.ui();

    idToolbar = 'tinymceToolbar' + rQ_base.newId();
    idEditor = 'tinymce' + rQ_base.newId();

    toolbar$ = rQ.div('toolbar').attr('id', idToolbar);
    editor$ = rQ.div('editor').attr('id', idEditor);
    view$ = ui.view().addClass('tinymce-editor-ui').append(toolbar$, editor$);

    editor$.html(settings.htmlText);

    if (settings.viewOnly) {
      read();
    } else {

      setTimeout(
          function() {
            tinymce
                .init({

                  fixed_toolbar_container : '#' + idToolbar,
                  selector : '#' + idEditor,
                  inline : true,
                  plugins : [
                      'advlist autolink  link image lists charmap print preview hr anchor pagebreak spellchecker',
                      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                      'save table contextmenu directionality emoticons template paste textcolor autosave' ],
                  toolbar : 'save undo redo lists searchreplace bullist numlist anchor preview',
                  visualblocks_default_state : false,
                  menubar : 'edit insert view format table',
                  skin : "lightgray",
                  statusbar : true,
                  menu : {

                    edit : {
                      title : 'Edit',
                      items : 'undo redo | cut copy paste pastetext | selectall'
                    },
                    insert : {
                      title : 'Insert',
                      items : 'link image |  hr'
                    },
                    view : {
                      title : 'View',
                      items : 'visualaid'
                    },
                    format : {
                      title : 'Format',
                      items : 'bold italic underline | bullist | numlist | strikethrough superscript subscript | formats | removeformat'
                    },
                    table : {
                      title : 'Table',
                      items : 'inserttable tableprops deletetable | cell row column'
                    }
                  },

                  selection_toolbar : 'bold italic | quicklink h2 h3 blockquote',

                  save_onsavecallback : function(s) {

                    save();

                  }
                });

            read();

          }, 0);
    }
    return ui;

    function save() {
      rQ.call(settings.saveServiceId, {
        'htmlTextId' : settings.htmlTextId,
        'htmlText' : editor$.html()
      }, function(data) {
        if (data.exception) {
          alert(data.exception);
        }
      });
    }

    function read() {
      rQ.call(settings.getServiceId, {
        'htmlTextId' : settings.htmlTextId
      }, function(data) {
        var e = rQ.toList(data)[0];
        if (data.exception) {
          alert(data.exception);
          return;
        }
        if (e) {
          editor$.html(e.htmlText);
        }
      });
    }

  }
  rQ.tinymceEditorUi = tinymceEditorUi;

  // TINYMCE EDITOR UI

  //
  // TOAST
  //
  /**
   * @memberOf rQ_ui_md
   */
  function toast() {
    var s = rQ.span();
    Materialize.toast(s.append.apply(s, arguments), 5000, 'rounded');
  }
  rQ.toast = toast;

  // TOAST


})();