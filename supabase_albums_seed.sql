-- Supabase SQL Seeding for 10 New Albums

begin;

insert into albums (id, title, description, cover_url, created_at)
values ('album-pre-wedding-tor-kar-ning', 'Pre Wedding Tor Kar & Ning', 'A romantic pre-wedding photo session of Tor Kar & Ning. Capture of sweet glances and elegant portraits.\nພາບຖ່າຍພຣີເວດດິ້ງອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Tor Kar & Ning. ບັນທຶກທຸກຊ່ວງເວລາແຫ່ງຄວາມຮັກ.', '/albums/pre-wedding-tor-kar-ning/1.jpg', now() - interval '0 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-0', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/1.jpg', now() - interval '0 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-1', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/2.jpg', now() - interval '0 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-2', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/3.jpg', now() - interval '0 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-3', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/4.jpg', now() - interval '0 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-4', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/5.jpg', now() - interval '0 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-5', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/6.jpg', now() - interval '0 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-6', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/7.jpg', now() - interval '0 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-7', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/8.jpg', now() - interval '0 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-8', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/9.jpg', now() - interval '0 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-9', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/10.jpg', now() - interval '0 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-10', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/11.jpg', now() - interval '0 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-11', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/12.jpg', now() - interval '0 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-12', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/13.jpg', now() - interval '0 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-13', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/14.jpg', now() - interval '0 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-tor-kar-ning-14', 'album-pre-wedding-tor-kar-ning', '/albums/pre-wedding-tor-kar-ning/15.jpg', now() - interval '0 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-phonexay-viengphet', 'Wedding Day Phonexay & Viengphet', 'A beautiful wedding day celebration of Phonexay & Viengphet. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Phonexay & Viengphet. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-phonexay-viengphet/1.jpg', now() - interval '1 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-0', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/1.jpg', now() - interval '1 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-1', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/2.jpg', now() - interval '1 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-2', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/3.jpg', now() - interval '1 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-3', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/4.jpg', now() - interval '1 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-4', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/5.jpg', now() - interval '1 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-5', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/6.jpg', now() - interval '1 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-6', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/7.jpg', now() - interval '1 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-7', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/8.jpg', now() - interval '1 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-8', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/9.jpg', now() - interval '1 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-9', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/10.jpg', now() - interval '1 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-10', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/11.jpg', now() - interval '1 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-11', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/12.jpg', now() - interval '1 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-12', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/13.jpg', now() - interval '1 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-13', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/14.jpg', now() - interval '1 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-14', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/15.jpg', now() - interval '1 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-15', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/16.jpg', now() - interval '1 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-16', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/17.jpg', now() - interval '1 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-17', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/18.jpg', now() - interval '1 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-18', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/19.jpg', now() - interval '1 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-19', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/20.jpg', now() - interval '1 seconds + 19 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-20', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/21.jpg', now() - interval '1 seconds + 20 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-21', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/22.jpg', now() - interval '1 seconds + 21 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-22', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/23.jpg', now() - interval '1 seconds + 22 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-23', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/24.jpg', now() - interval '1 seconds + 23 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-24', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/25.jpg', now() - interval '1 seconds + 24 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-25', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/26.jpg', now() - interval '1 seconds + 25 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-26', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/27.jpg', now() - interval '1 seconds + 26 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-27', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/28.jpg', now() - interval '1 seconds + 27 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-28', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/29.jpg', now() - interval '1 seconds + 28 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-29', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/30.jpg', now() - interval '1 seconds + 29 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-30', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/31.jpg', now() - interval '1 seconds + 30 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-31', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/32.jpg', now() - interval '1 seconds + 31 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-32', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/33.jpg', now() - interval '1 seconds + 32 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-33', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/34.jpg', now() - interval '1 seconds + 33 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-34', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/35.jpg', now() - interval '1 seconds + 34 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-35', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/36.jpg', now() - interval '1 seconds + 35 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-36', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/37.jpg', now() - interval '1 seconds + 36 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-37', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/38.jpg', now() - interval '1 seconds + 37 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-38', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/39.jpg', now() - interval '1 seconds + 38 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-39', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/40.jpg', now() - interval '1 seconds + 39 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-40', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/41.jpg', now() - interval '1 seconds + 40 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-41', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/42.jpg', now() - interval '1 seconds + 41 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-42', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/43.jpg', now() - interval '1 seconds + 42 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-43', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/44.jpg', now() - interval '1 seconds + 43 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-44', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/45.jpg', now() - interval '1 seconds + 44 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-45', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/46.jpg', now() - interval '1 seconds + 45 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-46', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/47.jpg', now() - interval '1 seconds + 46 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-47', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/48.jpg', now() - interval '1 seconds + 47 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-48', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/49.jpg', now() - interval '1 seconds + 48 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-49', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/50.jpg', now() - interval '1 seconds + 49 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-phonexay-viengphet-50', 'album-wedding-phonexay-viengphet', '/albums/wedding-phonexay-viengphet/51.jpg', now() - interval '1 seconds + 50 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-pre-wedding-bank-pookie', 'Pre Wedding Bank & Pookie', 'A romantic pre-wedding photo session of Bank & Pookie. Capture of sweet glances and elegant portraits.\nພາບຖ່າຍພຣີເວດດິ້ງອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Bank & Pookie. ບັນທຶກທຸກຊ່ວງເວລາແຫ່ງຄວາມຮັກ.', '/albums/pre-wedding-bank-pookie/1.jpg', now() - interval '2 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-0', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/1.jpg', now() - interval '2 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-1', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/2.jpg', now() - interval '2 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-2', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/3.jpg', now() - interval '2 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-3', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/4.jpg', now() - interval '2 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-4', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/5.jpg', now() - interval '2 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-5', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/6.jpg', now() - interval '2 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-6', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/7.jpg', now() - interval '2 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-7', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/8.jpg', now() - interval '2 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-8', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/9.jpg', now() - interval '2 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-9', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/10.jpg', now() - interval '2 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-10', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/11.jpg', now() - interval '2 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-11', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/12.jpg', now() - interval '2 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-12', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/13.jpg', now() - interval '2 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-13', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/14.jpg', now() - interval '2 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-14', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/15.jpg', now() - interval '2 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-15', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/16.jpg', now() - interval '2 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-16', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/17.jpg', now() - interval '2 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-pre-wedding-bank-pookie-17', 'album-pre-wedding-bank-pookie', '/albums/pre-wedding-bank-pookie/18.jpg', now() - interval '2 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-houmphan-soumontha', 'Wedding Day HOUMPHAN & SOUMONTHA', 'A beautiful wedding day celebration of HOUMPHAN & SOUMONTHA. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ HOUMPHAN & SOUMONTHA. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-houmphan-soumontha/1.jpg', now() - interval '3 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-0', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/1.jpg', now() - interval '3 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-1', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/2.jpg', now() - interval '3 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-2', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/3.jpg', now() - interval '3 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-3', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/4.jpg', now() - interval '3 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-4', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/5.jpg', now() - interval '3 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-5', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/6.jpg', now() - interval '3 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-6', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/7.jpg', now() - interval '3 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-7', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/8.jpg', now() - interval '3 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-8', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/9.jpg', now() - interval '3 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-9', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/10.jpg', now() - interval '3 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-10', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/11.jpg', now() - interval '3 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-11', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/12.jpg', now() - interval '3 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-12', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/13.jpg', now() - interval '3 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-13', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/14.jpg', now() - interval '3 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-14', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/15.jpg', now() - interval '3 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-15', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/16.jpg', now() - interval '3 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-16', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/17.jpg', now() - interval '3 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-17', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/18.jpg', now() - interval '3 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-houmphan-soumontha-18', 'album-wedding-houmphan-soumontha', '/albums/wedding-houmphan-soumontha/19.jpg', now() - interval '3 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-odai-sophia', 'Wedding Day Odai & Sophia', 'A beautiful wedding day celebration of Odai & Sophia. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Odai & Sophia. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-odai-sophia/1.jpg', now() - interval '4 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-0', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/1.jpg', now() - interval '4 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-1', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/2.jpg', now() - interval '4 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-2', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/3.jpg', now() - interval '4 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-3', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/4.jpg', now() - interval '4 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-4', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/5.jpg', now() - interval '4 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-5', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/6.jpg', now() - interval '4 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-6', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/7.jpg', now() - interval '4 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-7', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/8.jpg', now() - interval '4 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-8', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/9.jpg', now() - interval '4 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-9', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/10.jpg', now() - interval '4 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-10', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/11.jpg', now() - interval '4 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-11', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/12.jpg', now() - interval '4 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-odai-sophia-12', 'album-wedding-odai-sophia', '/albums/wedding-odai-sophia/13.jpg', now() - interval '4 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-chokxay-latda', 'Wedding Day ໂຊກໄຊ & ລັດດາ', 'A beautiful wedding day celebration of Chokxay & Latda. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ ໂຊກໄຊ & ລັດດາ. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-chokxay-latda/1.jpg', now() - interval '5 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-0', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/1.jpg', now() - interval '5 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-1', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/2.jpg', now() - interval '5 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-2', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/3.jpg', now() - interval '5 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-3', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/4.jpg', now() - interval '5 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-4', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/5.jpg', now() - interval '5 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-5', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/6.jpg', now() - interval '5 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-6', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/7.jpg', now() - interval '5 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-7', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/8.jpg', now() - interval '5 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-8', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/9.jpg', now() - interval '5 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-chokxay-latda-9', 'album-wedding-chokxay-latda', '/albums/wedding-chokxay-latda/10.jpg', now() - interval '5 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-engagement-tinu', 'ງານໝັ້ນ Tinu', 'A romantic engagement celebration of Tinu. Capture of sweet glances and traditional Lao custom. / ງານໝັ້ນອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Tinu. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.', '/albums/engagement-tinu/1.jpg', now() - interval '6 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-0', 'album-engagement-tinu', '/albums/engagement-tinu/1.jpg', now() - interval '6 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-1', 'album-engagement-tinu', '/albums/engagement-tinu/2.jpg', now() - interval '6 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-2', 'album-engagement-tinu', '/albums/engagement-tinu/2-0.jpg', now() - interval '6 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-3', 'album-engagement-tinu', '/albums/engagement-tinu/2-1.jpg', now() - interval '6 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-4', 'album-engagement-tinu', '/albums/engagement-tinu/3.jpg', now() - interval '6 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-5', 'album-engagement-tinu', '/albums/engagement-tinu/3-0.jpg', now() - interval '6 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-6', 'album-engagement-tinu', '/albums/engagement-tinu/3-01.jpg', now() - interval '6 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-7', 'album-engagement-tinu', '/albums/engagement-tinu/3-1.jpg', now() - interval '6 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-8', 'album-engagement-tinu', '/albums/engagement-tinu/3-2.jpg', now() - interval '6 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-9', 'album-engagement-tinu', '/albums/engagement-tinu/3-3.jpg', now() - interval '6 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-10', 'album-engagement-tinu', '/albums/engagement-tinu/4.jpg', now() - interval '6 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-11', 'album-engagement-tinu', '/albums/engagement-tinu/4-1.jpg', now() - interval '6 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-12', 'album-engagement-tinu', '/albums/engagement-tinu/4-2.jpg', now() - interval '6 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-13', 'album-engagement-tinu', '/albums/engagement-tinu/5.jpg', now() - interval '6 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-14', 'album-engagement-tinu', '/albums/engagement-tinu/6.jpg', now() - interval '6 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-15', 'album-engagement-tinu', '/albums/engagement-tinu/7.jpg', now() - interval '6 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-16', 'album-engagement-tinu', '/albums/engagement-tinu/8.jpg', now() - interval '6 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-17', 'album-engagement-tinu', '/albums/engagement-tinu/9.jpg', now() - interval '6 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-18', 'album-engagement-tinu', '/albums/engagement-tinu/10.jpg', now() - interval '6 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-19', 'album-engagement-tinu', '/albums/engagement-tinu/10-1.jpg', now() - interval '6 seconds + 19 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-20', 'album-engagement-tinu', '/albums/engagement-tinu/10-2.jpg', now() - interval '6 seconds + 20 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-21', 'album-engagement-tinu', '/albums/engagement-tinu/10-3.jpg', now() - interval '6 seconds + 21 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-22', 'album-engagement-tinu', '/albums/engagement-tinu/10-4.jpg', now() - interval '6 seconds + 22 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-23', 'album-engagement-tinu', '/albums/engagement-tinu/10-5.jpg', now() - interval '6 seconds + 23 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-24', 'album-engagement-tinu', '/albums/engagement-tinu/10-6.jpg', now() - interval '6 seconds + 24 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-25', 'album-engagement-tinu', '/albums/engagement-tinu/11.jpg', now() - interval '6 seconds + 25 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-26', 'album-engagement-tinu', '/albums/engagement-tinu/12.jpg', now() - interval '6 seconds + 26 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-27', 'album-engagement-tinu', '/albums/engagement-tinu/13.jpg', now() - interval '6 seconds + 27 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-28', 'album-engagement-tinu', '/albums/engagement-tinu/14.jpg', now() - interval '6 seconds + 28 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-29', 'album-engagement-tinu', '/albums/engagement-tinu/15.jpg', now() - interval '6 seconds + 29 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-30', 'album-engagement-tinu', '/albums/engagement-tinu/16.jpg', now() - interval '6 seconds + 30 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-tinu-31', 'album-engagement-tinu', '/albums/engagement-tinu/17.jpg', now() - interval '6 seconds + 31 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-25-nov-2025', 'Wedding 25 nov 2025', 'A beautiful wedding day celebration of November 25, 2025. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກ. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-25-nov-2025/0.jpg', now() - interval '7 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-0', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/0.jpg', now() - interval '7 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-1', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/1.jpg', now() - interval '7 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-2', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/2.jpg', now() - interval '7 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-3', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/3.jpg', now() - interval '7 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-4', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/4.jpg', now() - interval '7 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-5', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/5.jpg', now() - interval '7 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-6', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/6.jpg', now() - interval '7 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-7', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/7.jpg', now() - interval '7 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-8', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/8.jpg', now() - interval '7 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-9', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/9.jpg', now() - interval '7 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-10', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/10.jpg', now() - interval '7 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-11', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/11.jpg', now() - interval '7 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-12', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/12.jpg', now() - interval '7 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-13', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/13.jpg', now() - interval '7 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-14', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/14.jpg', now() - interval '7 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-15', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/15.jpg', now() - interval '7 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-16', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/16.jpg', now() - interval '7 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-17', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/17.jpg', now() - interval '7 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-18', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/18.jpg', now() - interval '7 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-19', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/19.jpg', now() - interval '7 seconds + 19 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-20', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/20.jpg', now() - interval '7 seconds + 20 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-21', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/21.jpg', now() - interval '7 seconds + 21 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-22', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/22.jpg', now() - interval '7 seconds + 22 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-23', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/23.jpg', now() - interval '7 seconds + 23 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-24', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/24.jpg', now() - interval '7 seconds + 24 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-25', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/25.jpg', now() - interval '7 seconds + 25 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-26', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/26.jpg', now() - interval '7 seconds + 26 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-27', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/27.jpg', now() - interval '7 seconds + 27 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-28', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/28.jpg', now() - interval '7 seconds + 28 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-29', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/29.jpg', now() - interval '7 seconds + 29 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-25-nov-2025-30', 'album-wedding-25-nov-2025', '/albums/wedding-25-nov-2025/30.jpg', now() - interval '7 seconds + 30 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-wedding-aiy-tamon', 'Wedding Days Aiy & Tamon', 'A beautiful wedding day celebration of Aiy & Tamon. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Aiy & Tamon. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.', '/albums/wedding-aiy-tamon/0.jpg', now() - interval '8 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-0', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/0.jpg', now() - interval '8 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-1', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/1.jpg', now() - interval '8 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-2', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/2.jpg', now() - interval '8 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-3', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/3.jpg', now() - interval '8 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-4', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/4.jpg', now() - interval '8 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-5', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/5.jpg', now() - interval '8 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-6', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/6.jpg', now() - interval '8 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-7', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/7.jpg', now() - interval '8 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-8', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/8.jpg', now() - interval '8 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-9', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/9.jpg', now() - interval '8 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-10', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/10.jpg', now() - interval '8 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-11', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/11.jpg', now() - interval '8 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-12', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/12.jpg', now() - interval '8 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-13', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/13.jpg', now() - interval '8 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-14', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/14.jpg', now() - interval '8 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-15', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/15.jpg', now() - interval '8 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-16', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/16.jpg', now() - interval '8 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-17', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/17.jpg', now() - interval '8 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-18', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/18.jpg', now() - interval '8 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-19', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/19.jpg', now() - interval '8 seconds + 19 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-20', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/20.jpg', now() - interval '8 seconds + 20 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-21', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/21.jpg', now() - interval '8 seconds + 21 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-22', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/22.jpg', now() - interval '8 seconds + 22 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-23', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/23.jpg', now() - interval '8 seconds + 23 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-24', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/24.jpg', now() - interval '8 seconds + 24 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-wedding-aiy-tamon-25', 'album-wedding-aiy-tamon', '/albums/wedding-aiy-tamon/25.jpg', now() - interval '8 seconds + 25 minutes')
on conflict (id) do update set url = excluded.url;

insert into albums (id, title, description, cover_url, created_at)
values ('album-engagement-phoutthasin-kataiy', 'ງານໝັ້ນ Phoutthasin & Kataiy', 'A romantic engagement celebration of Phoutthasin & Kataiy. Capture of sweet glances and traditional Lao custom. / ງານໝັ້ນອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Phoutthasin & Kataiy. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.', '/albums/engagement-phoutthasin-kataiy/1.jpg', now() - interval '9 seconds')
on conflict (id) do update set title = excluded.title, description = excluded.description, cover_url = excluded.cover_url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-0', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/1.jpg', now() - interval '9 seconds + 0 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-1', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/2.jpg', now() - interval '9 seconds + 1 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-2', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/3.jpg', now() - interval '9 seconds + 2 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-3', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/4.jpg', now() - interval '9 seconds + 3 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-4', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/5.jpg', now() - interval '9 seconds + 4 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-5', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/6.jpg', now() - interval '9 seconds + 5 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-6', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/7.jpg', now() - interval '9 seconds + 6 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-7', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/8.jpg', now() - interval '9 seconds + 7 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-8', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/9.jpg', now() - interval '9 seconds + 8 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-9', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/10.jpg', now() - interval '9 seconds + 9 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-10', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/11.jpg', now() - interval '9 seconds + 10 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-11', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/12.jpg', now() - interval '9 seconds + 11 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-12', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/13.jpg', now() - interval '9 seconds + 12 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-13', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/14.jpg', now() - interval '9 seconds + 13 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-14', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/15.jpg', now() - interval '9 seconds + 14 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-15', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/16.jpg', now() - interval '9 seconds + 15 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-16', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/17.jpg', now() - interval '9 seconds + 16 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-17', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/18.jpg', now() - interval '9 seconds + 17 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-18', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/19.jpg', now() - interval '9 seconds + 18 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-19', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/20.jpg', now() - interval '9 seconds + 19 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-20', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/21.jpg', now() - interval '9 seconds + 20 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-21', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/22.jpg', now() - interval '9 seconds + 21 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-22', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/23.jpg', now() - interval '9 seconds + 22 minutes')
on conflict (id) do update set url = excluded.url;

insert into photos (id, album_id, url, created_at)
values ('photo-engagement-phoutthasin-kataiy-23', 'album-engagement-phoutthasin-kataiy', '/albums/engagement-phoutthasin-kataiy/24.jpg', now() - interval '9 seconds + 23 minutes')
on conflict (id) do update set url = excluded.url;

commit;