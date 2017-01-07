'''
TODO: explain how it works
'''
BOSSES = (
    ('Air Man', 'E3', 14),
    ('Bubble Man', 'D1', 17),
    ('Crash Man', 'C5', 7),
    ('Flash Man', 'C1', 13),
    ('Heat Man', 'B2', 13),
    ('Metal Man', 'E5', 16),
    ('Quick Man', 'B4', 5),
    ('Wood Man', 'D3', 12)
    )

GRID = []
for l in ['A','B','C','D','E']:
    for i in range(1,6):
        GRID.append('%s%s' % (l,i))

BOTTOM = GRID[5:]
TANKS = 0 # can be 0..4
WON = set() # which bosses have been defeated [0..7]
MAX = len(BOTTOM)

marks = set()
marks.add('%s%s' % ('A', 1+TANKS))
for i, (name, loc, skip) in enumerate(BOSSES):
    idx = BOTTOM.index(loc)
    idx += TANKS
    idx %= MAX

    if i not in WON:
        idx += skip
        idx %= MAX

    print BOTTOM[idx]
    marks.add(BOTTOM[idx])

print marks

print '-' * ((5*4)+1)
for i in range(0,len(GRID),5):
    dots = []
    for n in range(i, i+5):
        if GRID[n] in marks:
            dots.append('X')
        else:
            dots.append(' ')

    print '| ' + ' | '.join(dots) + ' |'
    print '-' * ((5*4)+1)
