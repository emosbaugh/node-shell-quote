var test = require('tape');
var parse = require('../').parse;

test('single operators', function (t) {
    t.same(parse('beep | boop'), [ 'beep', { op: '|' }, 'boop' ]);
    t.same(parse('beep|boop'), [ 'beep', { op: '|' }, 'boop' ]);
    t.same(parse('beep \\| boop'), [ 'beep', '|', 'boop' ]);
    t.same(parse('beep "|boop"'), [ 'beep', '|boop' ]);
    
    t.same(parse('echo zing &'), [ 'echo', 'zing', { op: '&' } ]);
    t.same(parse('echo zing&'), [ 'echo', 'zing', { op: '&' } ]);
    t.same(parse('echo zing\\&'), [ 'echo', 'zing&' ]);
    t.same(parse('echo "zing\\&"'), [ 'echo', 'zing&' ]);
    
    t.same(parse('beep;boop'), [ 'beep', { op: ';' }, 'boop' ]);
    t.same(parse('(beep;boop)'), [
        { op: '(' }, 'beep', { op: ';' }, 'boop', { op: ')' }
    ]);
    
    t.end();
});

test('double operators', function (t) {
    t.same(parse('beep || boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep||boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep ||boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep|| boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep  ||   boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.end();
});
