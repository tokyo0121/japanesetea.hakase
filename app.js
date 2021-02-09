$(function(){

  var Que = function(){
    var _self = this;
    _self.point = 0;
    _self.que = $('.que');
    _self.input = $('.que input');
    _self.LEN = _self.que.length;
    _self.que_num = 0;
    _self.que_prenum = 0;
    _self.result = $('.result');
  }

  Que.prototype = {
    'init':function(){
      var _self = this;
      _self.input.on('change',function(){
        _self.check();
      })
      _self.que.eq(_self.que_prenum).addClass('active');
      _self.que.eq(_self.que_prenum).addClass('open');
    },
    'check':function(){
      var _self = this,
          _count = 0;
          _self.input.each(function(){
            if($(this).prop('checked') && $(this).val() == 'yes'){
              _count ++;
            }
          })
          _self.point = _count;
          _self.que_num ++;
          _self.complete_check();
          _self.display_change();
    },
    'result_display':function(num){
        var _self = this;
        if(num > _self.LEN-1) num = _self.LEN -1;
        console.log('結果は' + num);
        _self.result.eq(num).addClass('active');
        _self.wait(500).then(function(){
        _self.result.eq(num).addClass('open');
        });
    },
    'restart':function(){
        var _self = this;
        _self.que.eq(_self.que_num).addClass('active');
      _self.wait(400).then(function(){
        _self.que.eq(_self.que_num).addClass('open');
      });
    },
    'reset':function(){
      var _self = this;
      _self.wait(1000).then(function(){
      _self.input.prop('checked',false);
        _self.que.removeClass('active');
        _self.point  = 0;
        _self.que_prenum= 0;
        _self.que_num  = 0;
        _self.restart();
      });

    },
    'complete_check':function(){
      var _self = this;
      if(_self.input.filter(function(){return ($(this).prop('checked'))}).length >= _self.LEN){
        _self.que.eq(_self.que_prenum).on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend',function(){
          _self.wait(500).then(function(){
          //alert('完了しました。結果は' + _self.point + '番');
          //_self.reset();

          _self.result_display(_self.point);
          });
        });
        _self.wait(400).then(function(){
        _self.que.eq(_self.que_prenum).addClass('close');
        _self.que.eq(_self.que_prenum).removeClass('open');
         });
      }
    },
    'display_change':function(){
      var _self = this;

      _self.que.eq(_self.que_prenum).on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend',function(){
        $(this).off();
        _self.que.eq(_self.que_prenum).removeClass('active');
        _self.que.eq(_self.que_prenum).removeClass('close');
        _self.que_prenum = _self.que_num;
        _self.que.eq(_self.que_num).addClass('active');

          _self.wait(400).then(function(){
            _self.que.eq(_self.que_num).addClass('open');
          });

    })
      _self.wait(400).then(function(){
      _self.que.eq(_self.que_prenum).addClass('close');
      _self.que.eq(_self.que_prenum).removeClass('open');
      });
      },
    'wait':function(sec){
      var d = new $.Deferred;
      setTimeout(function(){
        d.resolve();
      },sec);
      return d.promise();
      }
  }

  new Que().init();
});
