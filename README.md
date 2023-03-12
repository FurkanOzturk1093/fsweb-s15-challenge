# Sprint 15 Challenge


## Proje Kurulumu

- Fork, clone, ve `npm install`.
- Databaseyi oluşturmak için: `npm run migrate`.
- Testler için: `npm test`.

## Proje Talimatları

Bilmeceler bugünlerde çok moda! Bu challenge'da, bir bilmece uygulaması oluşturacaksınız.

Kullanıcılar, yeni bir hesap oluşturmak için `[POST] /api/auth/register` uç noktasını ve bir token almak için `[POST] /api/auth/login` uç noktasını kullanacaklar.

Ayrıca token'ı olmayan hiç kimsenin `[GET] /api/bilmeceler`e erişemeyeceğinden ve bilmecelere erişemeyeceğinden emin olmalıyız.

Kullanıcının parolasını `bcryptjs` kullanarak hashleyeceğiz ve JSON Web Tokenları için `jsonwebtoken` kitaplığını kullanacağız.

### MVP

Bitmiş projeniz aşağıdaki gereksinimlerin tümünü içermelidir (her dosyanın içinde daha fazla talimat bulunur):

- [ ] `api/auth/auth-router.js` içinde uygulanan, hesap oluşturma ve oturum açma işlevlerine sahip bir kimlik doğrulama(authentication) iş akışı.
- [ ] `api/middleware/restricted.js` içinde uygulanan, kimliği doğrulanmamış(non-authorized) isteklerden gelen kaynaklara erişimi kısıtlamak için kullanılan middleware.
- [ ] API uç noktası başına `api/server.test.js` içinde yazılmış en az 2şer test.

**ÖNEMLİ NOTLAR:**

- Bu projenizi teslim ettiğinizde biz de üzerinde testler yapma hakkını saklı tutuyoruz. Proje talimatlarına harfiyen uyduğunuzdan emin olun!
- `bcryptjs` ile 2^8 hash turunu aşmayın.
- Env kullanıyorsanız, değerlerin oradan okunduğundan emin olun (ör. `process.env.SECRET || "shh"`).
- Ek dosyalar oluşturabilirsiniz ancak **mevcut dosyaları veya klasörleri taşımayın veya yeniden adlandırmayın**.
- Ekstra kitaplıklar kurmak dışında `package.json` dosyanızı değiştirmeyin. Mevcut paketleri güncellemeyin.
- Veritabanında `users` tablosu zaten var, ancak sorun yaşarsanız `migration` yapılabilir.
- Çözümünüzde, en iyi uygulamaları izlemeniz, temiz ve profesyonel sonuçlar üretmeniz çok önemlidir.
- Çalışmanızı gözden geçirmek, iyileştirmek ve değerlendirmek için zaman planlayın ve temel profesyonel cilalama işlemini gerçekleştirin.

**ESNEK GÖREVLER:**

- [ ] Bilmeceler tablosu yaratın:
     - [ ] migration dosyası 
     
     - [ ] ve var olan bilmeler için de seed dosyası oluşturun
     - [ ] bilmeceleri dosyadan değil de veritabanında okunmasını sağlayın.
- [ ] roles tablosu yaratın:
     - [ ] migration dosyası 
     - [ ] ve 1 admin kullanıcısı için seed dosyası oluşturun
- [ ] register olan bir kullanıcının rolünü "user" olarak kayıt edin. (transaction'a dikkat. aynı anda 2 tabloya yazıyoruz. bknz: s15g2 projesi)
- [ ] Bilmece ekleme endpoint'i yazın: (hata mesajlarnı ve başarılı kayıt mesajlarını kendiniz yazabilirsiniz.)
    - [ ] sadece admin olan kullanıcıların eklemesine izin verin. 
- [ ] kullanıcı ekleme endpoint'i yazın: (hata mesajlarını ve başarılı kayıt mesajlarını kendiniz yazabilirsiniz.)
     - [ ] sadece admin rolündekiler kullanabilir.
     - [ ] payload'da role_name olmalı.
     - [ ] payload'daki role_name sadece "admin" ve "user" olabilir.






