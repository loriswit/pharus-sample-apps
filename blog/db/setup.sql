\connect blog

set client_encoding to utf8;

create table Timestamp
(
    created  timestamp not null default now(),
    modified timestamp not null default now()
);

create table Category
(
    id   serial primary key,
    name bpchar not null
) inherits (Timestamp);

create table Post
(
    id         serial primary key,
    title      bpchar  not null,
    author     bpchar  not null,
    content    text    not null,
    categoryId integer not null references Category on delete cascade
) inherits (Timestamp);

create table Comment
(
    id      serial primary key,
    author  bpchar  not null,
    content text    not null,
    postId  integer not null references Post on delete cascade
) inherits (Timestamp);

insert into Category (name)
values ('Travel'),
       ('Food'),
       ('Tech'),
       ('Science'),
       ('Entertainment'),
       ('Culture'),
       ('Art');

insert into Post (title, author, categoryId, created, modified, content)
values ('Hidden Gems of Switzerland: Chasing Waterfalls in Lauterbrunnen', 'Alice', 1, '2023-09-13', '2023-09-13', '# Introduction

Switzerland is a country synonymous with stunning scenery, charming villages, and of course, the majestic Alps.  But beyond the famous peaks and bustling ski resorts, there are hidden gems waiting to be discovered by adventurous travelers.  One such place is the Lauterbrunnen Valley, a fairytale valley nestled in the Bernese Oberland region.

Lauterbrunnen, which translates to "Many Fountains"  is aptly named.  Waterfalls cascade down the valley walls, creating a scene of breathtaking beauty.  In this blog post, we''ll explore some of the must-see waterfalls in Lauterbrunnen, offering a glimpse into this off-the-beaten-path paradise.

# Exploring Lauterbrunnen''s Waterfalls''

##  1. Staubbach Falls (Staubbachfall)
The undisputed king of Lauterbrunnen''s waterfalls is Staubbach Falls.  With a drop of nearly 300 meters, it''s the tallest free-falling waterfall in Switzerland.  The mist from the falls creates a refreshing ambiance, and on a sunny day, you might even see a rainbow shimmering in the spray.

**Tip:** For the best view of Staubbach Falls, head to the village of Lauterbrunnen itself.  The falls are visible from many points in the village, and there''s a viewing platform offering a panoramic perspective.

![waterfall-1](/images/waterfall-1.webp)

## 2. Trümmelbach Falls (Trümmelbachfälle)

Unlike Staubbach Falls, Trümmelbach Falls are hidden inside the mountain.  Europe''s largest subterranean waterfall complex, Trümmelbach Falls can be accessed by elevator, taking you deep into the mountainside.  A series of walkways and tunnels lead you behind and beside the cascades, offering a unique perspective of the water''s power.

## 3. Murrenbach Falls

For those seeking a more adventurous waterfall experience, Murrenbach Falls is a great option.  Located near the village of Murren, these falls can be reached by a moderately challenging hike.  The trail offers stunning views of the valley and the surrounding mountains, and the reward at the end is a chance to stand directly beneath the cascading waters.

**Tip:** Be sure to check the weather conditions before attempting the hike to Murrenbach Falls.  The trail can be slippery when wet.

![waterfall-2](/images/waterfall-2.webp)

# Conclusion

Lauterbrunnen Valley is a treasure trove for waterfall enthusiasts.  From the majestic Staubbach Falls to the hidden wonder of Trümmelbach Falls, and the adventurous hike to Murrenbach Falls, there''s something for everyone in this fairytale valley.  So lace up your hiking boots, pack your raincoat, and get ready to be amazed by the hidden gems of Switzerland.');

insert into Comment (postId, author, content)
values (1, 'Sarah',
        'Wow, these waterfalls are incredible! Switzerland has always been on my travel bucket list, and now Lauterbrunnen Valley is definitely at the top. Thanks for the inspiration!'),
       (1, 'David',
        'This is such a helpful guide! I''m planning a trip to Switzerland next summer and was looking for places to go beyond the usual tourist spots. The hike to Murrenbach Falls sounds amazing, and I love the idea of exploring waterfalls inside a mountain at Trümmelbach Falls.'),
       (1, 'Lisa',
        'Beautiful post! The pictures would be amazing additions if you have any. Especially curious to see the view from behind Trümmelbach Falls.'),
       (1, 'Michael',
        'Have you been to any other hidden waterfall gems in Switzerland? I''d love to hear about more off-the-beaten-path adventures.'),
       (1, 'Emily',
        'Switzerland is stunning, but it can be expensive. Do you have any tips for budget-friendly travel in Lauterbrunnen?');


insert into Post (title, author, categoryId, created, modified, content)
values ('A Culinary Adventure: Exploring the World Through Food', 'Bob', 2, '2023-10-10', '2023-10-10', 'Food is more than just sustenance; it''s a journey for the senses, a bridge between cultures, and a way to connect with loved ones. In this blog, we''ll embark on a culinary adventure, exploring the exciting world of food!

## The Spice of Life: Global Flavors

Our taste buds can travel the world without ever leaving our kitchens. This week, let''s explore the vibrant world of [insert specific cuisine, e.g., Thai food]. We''ll delve into the unique ingredients, cooking techniques, and cultural significance behind these delicious dishes.

## From Farm to Fork: Fresh, Seasonal Ingredients

Eating seasonally is not just good for your taste buds, it''s good for the environment! We''ll explore the benefits of fresh, local produce and how to incorporate seasonal ingredients into your meals. We''ll also provide tips on storing and selecting the freshest fruits and vegetables.

## Beyond the Recipe: The Art of Cooking

Cooking isn''t just about following instructions; it''s about creativity and experimentation. We''ll explore basic cooking techniques that can be used to create endless culinary masterpieces. We''ll also bust some common cooking myths and provide tips for beginner cooks.

## Food for Thought: Nutrition and Well-being

Food plays a vital role in our overall health and well-being. We''ll discuss the importance of balanced nutrition and how to make healthy choices without sacrificing flavor. We''ll also explore different dietary needs and restrictions.

## Join the Conversation!

This blog is an open space to share your love of food! Share your favorite recipes, cooking tips, or cultural food experiences in the comments below. Let''s create a community of food enthusiasts who are passionate about creating, exploring, and enjoying delicious meals!

## Stay tuned for upcoming posts where we''ll:

- Uncover the secrets of delicious homemade bread
- Explore the world of vegetarian and vegan cuisine
- Whip up quick and easy meals for busy weeknights
- Dive into the fascinating history of food

So, grab your apron, fire up the stove, and join us on this delicious adventure!');

insert into Comment (postId, author, content)
values (2, 'Maya',
        'This is such a great idea for a blog! I''m always looking for new and exciting recipes to try, and I love learning about different cultures through their food.  This week, I''d be interested to learn more about the role of chilies in Thai cuisine.  Are there different types used for different flavors?  Any tips for someone who loves flavor but can''t handle too much heat?'),
       (2, 'Daniel',
        'I''m a huge advocate for seasonal eating!  There''s something so special about using fresh, local ingredients at their peak.  Do you have any tips for people who don''t have access to a farmer''s market?  Maybe suggestions for grocery store finds or creative substitutions?'),
       (2, 'Clara',
        'I''m a total beginner in the kitchen, but I''d love to learn more about the art of cooking.  Are there any essential techniques you''d recommend for someone just starting out?  Maybe mastering knife skills or understanding basic sauces?  Also, any tips for overcoming kitchen disasters? We''ve all been there!  :D');


insert into Post (title, author, categoryId, created, modified, content)
values ('The Hidden World in Your Coffee Cup: Unveiling the Science of a Perfect Brew', 'Carol', 4, '2023-12-21',
        '2023-12-21', 'Coffee, the elixir of life for many, is more than just a delicious morning pick-me-up. It''s a complex dance of chemistry and physics, from bean to cup. Today, we''ll delve into the fascinating science behind that perfect cup of joe.

## From Bean to Brew: A Chemical Journey

Our story begins with the coffee bean, a treasure trove of over 800 chemical compounds. The most important players? Caffeine, of course, the stimulant that gets our brains buzzing. But there are also aromatic compounds that give each coffee its unique flavor profile.

The roasting process is a delicate waltz of heat and time. As the beans roast, these aromatic compounds undergo a magical transformation, developing the rich flavors and aromas we love. Grind size also plays a crucial role. Finer grinds expose more surface area to water, leading to a stronger brew, while coarser grinds result in a more mellow cup.

![coffee-1](/images/coffee-1.webp)

## The Physics of Perfection

Water temperature is paramount.  Scalding hot water can extract bitter flavors, while lukewarm water won''t unlock the full potential of the beans. Different brewing methods rely on different water temperatures and contact times to achieve the desired extraction.

Pour-over methods, for example, use gravity to slowly saturate the grounds, resulting in a balanced and nuanced cup. French presses, on the other hand, immerse the grounds fully, leading to a bolder brew.

## Beyond the Buzz: Science for the Discerning Coffee Drinker

Understanding the science behind coffee allows you to experiment and create the perfect cup for your taste. Want a stronger brew? Try a finer grind or a longer extraction time. Craving a brighter flavor? Play with water temperature or explore pour-over methods.

So next time you savor that cup of coffee, take a moment to appreciate the science involved. It''s a beautiful reminder that even the simplest things in life can be journeys of discovery.

## Feeling Inspired? Explore More!

The world of coffee science is vast and exciting! Here are some resources to quench your thirst for knowledge:

- The Science of Good Coffee: https://www.scientificamerican.com/article/the-science-of-a-perfect-cup-of-coffee/
- World Coffee Research: https://worldcoffeeresearch.org/

Let''s raise a mug to science, for making our daily cup of coffee even more enjoyable!');

insert into Comment (postId, author, content)
values (3, 'David', 'Never realized coffee was this scientific! Explains my weak pour-over. Gonna try a finer grind!'),
       (3, 'Emily', '☕️ Who knew coffee brewing was a science? Thanks for the water temp and extraction time tips!'),
       (3, 'Daniel', 'Science + coffee = my happy place! Learning never stops, even with coffee!'),
       (3, 'Michael', 'Love the coffee chemistry! Any tips for a not-so-bitter cup?');


insert into Post (title, author, categoryId, created, modified, content)
values ('Is the Folding Phone Finally Ready for Prime Time?', 'Dave', 3, '2024-02-06', '2023-02-06', 'The past decade has seen smartphones evolve at a breakneck pace. From the bulky bricks of the early 2000s to the sleek, powerful devices we carry today, the way we interact with technology has been completely transformed. Yet, one futuristic concept has remained stubbornly elusive: the folding phone.

Remember the hype surrounding the Samsung Galaxy Fold in 2019? The idea of a phone that unfolded into a tablet-sized screen captured everyone''s imagination. But then came the reports of screen cracks and durability issues. The folding phone''s future seemed destined for the dustbin of tech graveyard.

![phone-1](/images/phone-1.webp)

Fast forward to 2024, and the folding phone is back with a vengeance. Companies like Samsung and Motorola have released new iterations that address the earlier concerns. Screens are tougher, hinges are more robust, and the overall user experience is significantly smoother.

So, is the folding phone finally ready for prime time? Here''s a breakdown of the pros and cons:

**Pros:**

- Increased screen real estate: Unfold your phone and enjoy a tablet-like experience, perfect for gaming, watching videos, or multitasking.
- Improved Portability: A folding phone folds neatly into your pocket, taking up less space than a phone and a tablet combined.
- Futuristic Design: Let''s face it, folding phones are cool. They represent a significant leap forward in mobile technology.

**Cons:**

- Durability Concerns: While improved, folding phones may still be more susceptible to damage than traditional phones.
- Higher Price Tag: Folding phones are currently more expensive than their non-folding counterparts.
- Limited App Optimization: Not all apps are optimized for the unique form factor of a folding phone, which can lead to awkward layouts.

Ultimately, whether or not a folding phone is right for you depends on your individual needs and preferences. If you''re a tech enthusiast who values innovation and a large screen experience, a folding phone might be worth considering. However, if you prioritize durability and affordability, you might be better off sticking with a traditional phone.

![phone-2](/images/phone-2.webp)

The folding phone market is still in its early stages, but the advancements made in recent years are undeniable. It will be interesting to see how this technology evolves and whether it can finally capture the mainstream market.');

insert into Comment (postId, author, content)
values (4, 'David', 'Clumsy here!  Need a durable phone, folding seems risky.'),
       (4, 'Maria', 'Big screen sounds awesome, but will the battery life hold up?'),
       (4, 'Michael', 'Folding phones = new 3D TVs? Cool idea, but needs work. Excited for next gen though!'),
       (4, 'Sarah', 'Tempted by folding phones, but the price tag stings!  Maybe next gen?'),
       (4, 'Alex', 'Folding phone = future of gaming! Plus, ditching phone & tablet? Sign me up!'),
       (4, 'Chen Wu', 'App optimization is key! Clunky apps on folding phones = dealbreaker for me.');

insert into Post (title, author, categoryId, created, modified, content)
values ('Lost in the Magic of Marrakech: A Journey Through Sights, Scents, and Souks', 'Alice', 1, '2024-03-14',
        '2024-03-14', 'Marrakech. The name itself evokes a sense of mystery, of bustling markets and ancient palaces. And let me tell you, it absolutely lives up to the hype!

My recent trip to this captivating city was an assault on the senses in the best way possible.  The vibrant colors, the intoxicating smells of spices and tagines, the cacophony of calls to prayer and chattering crowds – it was a full-on immersion into Moroccan culture.

![marrakech-1](/images/marrakech-1.webp)

## Wanderlust Through the Medina

I spent my days getting lost in the labyrinthine alleyways of the medina, the old city.  Every twist and turn revealed something new: a hidden gem of a riad (a traditional Moroccan house turned into a hotel), a stall overflowing with hand-woven rugs, a group of men sipping mint tea and playing checkers.  It was a sensory overload, but in the best way possible.

## A Night at Djemaa el-Fnaa

No visit to Marrakech would be complete without experiencing the magic of Djemaa el-Fnaa, the main square.  As the sun sets, the square transforms into a dazzling spectacle.  Food stalls fill the air with the aroma of sizzling meats and fragrant stews.  Snake charmers weave hypnotic spells with their cobras, acrobats defy gravity, and fortune tellers offer glimpses into the future.  It''s a feast for the eyes, ears, and definitely your nose!

![marrakech-2](/images/marrakech-2.webp)

## Beyond the Medina Walls

While the medina is undeniably captivating, there''s more to Marrakech than just the old town.  I ventured out to explore the magnificent Koutoubia Mosque, a towering landmark that dominates the city skyline.  The intricate carvings and beautiful courtyard were a testament to the artistry of Moroccan craftsmanship.

## A Journey for the Soul

Marrakech is more than just a tourist destination; it''s an experience that stays with you long after you leave.  It''s a place that challenges your senses, broadens your horizons, and leaves you feeling a little bit more in touch with the world around you.  So, if you''re looking for an adventure that will leave you breathless, book your trip to Marrakech today!

## Tips for fellow travelers:

- Be prepared to bargain in the souks! It''s all part of the experience.
- Comfortable shoes are a must for navigating the medina''s winding alleyways.
- Learn a few basic phrases in Arabic. The locals will appreciate the effort!
- Don''t be afraid to get lost – that''s often when you find the hidden gems.

![marrakech-3](/images/marrakech-3.webp)

Marrakech is a city that will stay with me forever.  It''s a place where time seems to slow down, and where every corner holds a new surprise.  So, pack your bags and get ready to lose yourself in the magic of Marrakech!');

insert into Comment (postId, author, content)
values (5, 'Omar',
        'Wow, your post brought Marrakech right to life!  The way you described the sights and smells makes me want to hop on a plane right now.  I''ve been considering a trip to Morocco, and this definitely sealed the deal. Thanks for the tips too!'),
       (5, 'Beatrice',
        'Beautiful writing!  Marrakech is one of my favorite cities in the world.  Did you get a chance to visit the Jardin Majorelle?  The gardens are stunning.');
