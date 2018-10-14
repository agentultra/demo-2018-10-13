# demo-2018-10-13 #

Not technically a laundromat demo as I finally moved house over the
summer to a place with a machine in the basement...

Regardless I wanted to do a time-boxed prototype of an _Entity
Component System_.

The goal was to put some sprites on screen and move them around. The
restriction was that I could only create the elements of the state of
these objects using _Components_ and I could only introduce behaviour
with _Systems_.

This one took approximately 30mins to try out.

I cheated a bit here with hard-coding the size of the sprite. That
should be captured in a component and passed into the toroid space
system.

I didn't get around to encapsulating the components and systems. As
the game initializes I hard-code the length of the component arrays
which I store individually in the game state. This becomes a problem
when I iterate over the components in the `update` and `render`
methods. Something would have to be done to remove that magic number.

I pull out the component arrays out of the state that I'm interested
in to pass to the systems. For a demo this small it makes the code
easy to follow. I'd be concerned with how this would scale in a
production-sized engine for a more complete game. It'd be nice if the
systems could map or subscribe to the components they operate on so
that the update step would declare which systems to apply and keep the
update method from growing with the product of components and systems.

Finally the systems mutate the components in this program. For a small
game this is fine, I think, but it means we cannot parallelize some
operations and it tightly couples the order in which systems are
processed. It might be worth investigating immutable data structures
if entity processing throughput became a bottleneck.

All in all a fun exercise and I think I might incorporate this pattern
more to see how I could round off those rough corners and make it
work for me.
