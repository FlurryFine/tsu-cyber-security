import { useState, type ComponentType } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, FlaskConical, Users, Sparkles, Database, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

// ─── Артикулы Технических Угроз для ТеорУгр ──────────────────────────────────────────────

interface TechArticle {
  id: number;
  title: string;
  owaspPath: string;
  owaspLabel: string;
  paragraphsEn: string[];
  paragraphsRu: string[];
}

const techArticles: TechArticle[] = [
  {
    id: 1,
    title: 'Broken Access Control',
    owaspPath: '/owasp-lab/broken-access',
    owaspLabel: '#1 Broken Access Control',
    paragraphsEn: [
      'Broken Access Control is one of the most critical vulnerabilities in web applications, occurring when a system fails to properly restrict user access to data and functions. In a secure architecture, every action must be verified server-side: who is performing it, what permissions they hold, and whether they have access to the specific resource.',
      'In practice, this manifests as users accessing others\' data, modifying information, or performing actions intended for different roles. Often the problem arises because developers rely on the client side — hiding interface buttons but not verifying access on the server. This creates a false sense of security.',
      'One of the most well-known types is IDOR (Insecure Direct Object Reference). Access to an object occurs through a direct identifier — a user ID, order number, or document ID. If the server doesn\'t verify ownership, simply changing the ID in a request grants access to another user\'s data.',
      'Another common scenario is missing function-level access control. An API may allow administrative functions if a user knows the correct endpoint. Without server-side role checks, an ordinary user can perform admin-level actions.',
      'REST API flaws are also frequent. The client passes object identifiers and the server trusts them without additional verification. This allows users to modify not only their own data but others\' data by altering request parameters.',
      'The root causes are typically architectural: no centralized authorization system, duplicated checks throughout the codebase, trusting client-side data, insufficient security testing, and complex business logic without clear access rules.',
      'The consequences can be extremely severe. Depending on the system, this may lead to personal data leaks, financial losses, modification or deletion of data, and full account compromise.',
      'Particularly dangerous is privilege escalation, where a user can not only access others\' data but elevate their access level to administrator — giving the attacker full control over the system.',
      'Protection requires a systematic approach. All access checks must be performed server-side only. Centralized authorization models such as RBAC or ABAC must be used, clearly defining which actions are available to each role.',
      'The principle of least privilege is essential: each user should have only the minimum necessary permissions. Excessive permissions increase the attack surface. Regular security testing is critical.',
      'Broken Access Control is not just a code error — it reflects how well the entire security architecture is designed. This is why it\'s considered one of the most dangerous vulnerability categories in modern web applications.',
    ],
    paragraphsRu: [
      'Broken Access Control — это одна из самых критичных уязвимостей в веб-приложениях, связанная с тем, что система неправильно ограничивает доступ пользователей к данным и функциям. В нормальной архитектуре каждое действие должно проверяться на сервере: кто именно его выполняет, какие у него права и имеет ли он доступ к конкретному ресурсу.',
      'На практике это проявляется очень просто: пользователь получает доступ к чужим данным, изменяет информацию или выполняет действия, которые предназначены для других ролей. Часто проблема возникает из-за того, что разработчики полагаются на клиентскую часть приложения. Это создаёт ложное чувство безопасности.',
      'Одним из самых известных типов таких уязвимостей является IDOR — Insecure Direct Object Reference. В этом случае доступ к объекту происходит через прямой идентификатор. Если сервер не проверяет принадлежность объекта, появляется возможность просто изменить ID в запросе и получить доступ к чужим данным.',
      'Ещё один распространённый сценарий — отсутствие проверки ролей. Например, API может позволять выполнение административных функций, если пользователь знает правильный endpoint. Если сервер не проверяет роль пользователя, система фактически теряет разделение привилегий.',
      'Также часто встречаются ошибки в REST API. Клиент сам передаёт идентификаторы объектов, а сервер доверяет этим данным без дополнительной проверки.',
      'Причины возникновения Broken Access Control обычно связаны с архитектурными ошибками: отсутствие централизованной системы авторизации, дублирование проверок в разных местах кода, недостаточное тестирование сценариев безопасности.',
      'Последствия таких уязвимостей могут быть крайне серьёзными: утечка персональных данных, финансовые потери, изменение или удаление информации, а также полная компрометация аккаунтов.',
      'Особенно опасна ситуация эскалации привилегий, когда пользователь может повысить свой уровень доступа до администратора. В таком случае атакующий получает полный контроль над системой.',
      'Защита от Broken Access Control требует системного подхода. Все проверки доступа должны выполняться исключительно на стороне сервера с использованием централизованных моделей авторизации.',
      'Также важно применять принцип наименьших привилегий. Каждый пользователь должен иметь только минимально необходимый набор прав, а поверхность атаки должна регулярно проверяться.',
      'Broken Access Control — это не просто ошибка в коде, а проблема архитектуры. Именно поэтому она считается одной из самых опасных категорий уязвимостей в современных приложениях.',
    ],
  },
  {
    id: 2,
    title: 'Cryptographic Failures',
    owaspPath: '/owasp-lab/cryptographic-failures',
    owaspLabel: '#2 Cryptographic Failures',
    paragraphsEn: [
      'Cryptographic Failures is a class of vulnerabilities arising from improper use of cryptography or its complete absence. The core problem is not the weakness of algorithms, but errors in their application, selection, or key management.',
      'Cryptography protects data confidentiality, integrity, and authenticity. However, developers frequently make mistakes that nullify all cryptographic protection.',
      'One of the most common problems is storing passwords in plaintext. In case of a breach, attackers gain immediate access to all accounts. Even with hashing, danger remains when outdated algorithms like MD5 or SHA-1 are used.',
      'Modern systems must use bcrypt or Argon2 for password storage — algorithms intentionally designed to be slow and computationally expensive.',
      'Another serious problem is absent encryption during data transmission. HTTP instead of HTTPS allows attackers to intercept all traffic via Man-in-the-Middle attacks.',
      'Improper cryptographic key management is also common — storing keys in source code, configuration files, or public repositories makes any encryption useless.',
      '"Roll-your-own" cryptography — where developers create their own algorithms — almost always reduces security due to the deep expertise required.',
      'The root causes involve insufficient understanding of cryptographic principles, outdated libraries, and ignoring modern standards.',
      'Consequences can be critical: user data leaks, account compromise, financial losses, and regulatory violations.',
      'Protection requires proven cryptographic libraries, TLS for all data transmission, and salted hashes using modern algorithms for passwords.',
      'Cryptographic Failures demonstrate that even the strongest mathematics is useless when applied incorrectly — implementation errors make cryptography the weakest link.',
    ],
    paragraphsRu: [
      'Cryptographic Failures — это класс уязвимостей, возникающих из-за неправильного использования криптографии или её отсутствия. В основе этой проблемы лежит не слабость алгоритмов, а ошибки в их применении или управлении ключами.',
      'Криптография используется для защиты конфиденциальности, целостности и подлинности данных. Однако на практике разработчики часто допускают ошибки, которые сводят всю криптографическую защиту к нулю.',
      'Одной из самых распространённых проблем является хранение паролей в открытом виде. В случае утечки базы данных злоумышленник получает мгновенный доступ ко всем аккаунтам.',
      'Современные системы должны использовать bcrypt или Argon2 — алгоритмы, специально замедляющие вычисления и делающие массовый перебор крайне затратным.',
      'Другой серьёзной проблемой является отсутствие шифрования при передаче данных. Использование HTTP вместо HTTPS позволяет перехватывать данные через атаки Man-in-the-Middle.',
      'Также часто встречается неправильное управление криптографическими ключами — их хранение в исходном коде или публичных репозиториях делает шифрование бесполезным.',
      'Самодельная криптография почти всегда снижает безопасность, так как создание криптографических алгоритмов требует глубокой экспертизы.',
      'Причины Cryptographic Failures связаны с недостатком понимания криптографических принципов, использованием устаревших библиотек и игнорированием современных стандартов.',
      'Последствия могут быть критическими: утечка данных, компрометация аккаунтов, финансовые потери и нарушение законодательства.',
      'Для защиты необходимо использовать проверенные библиотеки, TLS для всех передач данных и современные алгоритмы хэширования паролей.',
      'Cryptographic Failures показывают, что даже самая сильная математика бесполезна при неправильном применении — ошибки реализации делают криптографию слабым звеном.',
    ],
  },
  {
    id: 3,
    title: 'Injection',
    owaspPath: '/owasp-lab/sql-injection',
    owaspLabel: '#3 Injection',
    paragraphsEn: [
      'Injection is a class of vulnerabilities where an attacker inserts malicious data into application requests to change their execution logic. It is one of the oldest yet most persistent problems in web security.',
      'The essence of Injection is the absence of clear separation between data and code. When a system inserts user input into a query without proper handling, that query\'s behavior can be altered.',
      'The most well-known type is SQL Injection. Malicious input is inserted into an SQL query, allowing attackers to bypass authentication, extract data, or destroy entire databases.',
      'Other types include Command Injection, LDAP Injection, NoSQL Injection, and XPath Injection — all based on the same idea: user input is interpreted as code.',
      'Command Injection is especially dangerous because it allows execution of system commands on the server, potentially giving the attacker full server control.',
      'The causes are typical: no input validation, string concatenation for query building, trusting user input without parameterization.',
      'Developer convenience often drives the problem — simple string concatenation seems quick but creates critical vulnerabilities.',
      'Consequences can be extremely severe: data leaks, authentication bypass, data modification or deletion, and arbitrary code execution.',
      'Protection requires strict separation of data and logic. Parameterized queries (prepared statements) are the primary method — user input never becomes part of the executable query.',
      'Strict input validation including format, length, and allowed character checks is also important. ORM reduces risk but has its own limitations.',
      'Injection has remained relevant for decades because it occurs at the fundamental level of user-system interaction, yet continues to appear in real-world applications.',
    ],
    paragraphsRu: [
      'Injection — это класс уязвимостей, при котором злоумышленник внедряет вредоносные данные в запросы приложения, чтобы изменить их логику выполнения. Это одна из старейших, но до сих пор актуальных проблем.',
      'Суть Injection заключается в отсутствии чёткого разделения между данными и кодом. Когда система вставляет ввод пользователя в запрос без должной обработки, поведение запроса можно изменить.',
      'Наиболее известный вид — SQL Injection. Вредоносный ввод вставляется в SQL-запрос, позволяя обходить аутентификацию, извлекать данные или уничтожать базы данных.',
      'Существуют также Command Injection, LDAP Injection, NoSQL Injection, XPath Injection и другие — все они основаны на одной идее: ввод пользователя интерпретируется как код.',
      'Command Injection особенно опасен, так как позволяет выполнять системные команды на сервере, потенциально давая полный контроль над машиной.',
      'Причины типичны: отсутствие валидации входных данных, строковая конкатенация при формировании запросов, доверие к пользовательскому вводу.',
      'Удобство разработки часто движет проблемой — простое объединение строк кажется быстрым решением, но создаёт критическую уязвимость.',
      'Последствия могут быть крайне серьёзными: утечка данных, обход аутентификации, изменение или удаление данных, выполнение произвольного кода.',
      'Защита требует строгого разделения данных и логики. Параметризованные запросы (prepared statements) — основной метод защиты.',
      'Строгая валидация входных данных по формату, длине и допустимым символам также важна. ORM снижает риск, но имеет свои ограничения.',
      'Injection остаётся актуальной проблемой десятилетиями, потому что возникает на базовом уровне взаимодействия пользователя с системой.',
    ],
  },
  {
    id: 4,
    title: 'Insecure Design',
    owaspPath: '/owasp-lab/insecure-design',
    owaspLabel: '#4 Insecure Design',
    paragraphsEn: [
      'Insecure Design is a category of vulnerabilities arising not from code errors but from incorrect system design. An application may be technically bug-free yet its architecture itself allows abuse or bypassing of restrictions.',
      'This problem is introduced in early development stages. If a system is designed without considering threats, fixing it later becomes significantly more difficult and costly.',
      'Insecure Design stems from a lack of analysis of potential attacks and abuse scenarios. Developers focus on functionality — making the system "work" — without asking "how can it be broken?"',
      'A simple example: no login attempt limits. If a system allows unlimited password attempts, it becomes vulnerable to brute-force even with strong password hashing.',
      'Another example is flawed business logic. A promo code usable unlimited times, or a refund processed without purchase verification — these are design errors, not code errors.',
      'Especially dangerous are scenarios where the application correctly performs all operations but doesn\'t consider that users might combine them non-standardly for advantage.',
      'Root causes relate to development process: absent threat modeling, focus only on functionality, inexperience in building secure systems, and ignoring abuse scenarios.',
      'Consequences can be diverse — financial losses, restriction bypasses, functionality abuse, or full business logic compromise.',
      'Insecure Design is particularly dangerous because it scales — an architectural error can manifest in dozens of different places across the application.',
      'Protection requires adopting secure-by-design principles from the very beginning. Threat modeling views the system from an attacker\'s perspective before writing code.',
      'Insecure Design reminds us that security begins with the idea, not the code. If a system is designed without considering threats, no implementation-level fixes can fully solve the problem.',
    ],
    paragraphsRu: [
      'Insecure Design — это категория уязвимостей, возникающих не из-за ошибок в коде, а из-за неправильного проектирования системы. Приложение может быть технически реализовано без багов, но сама его архитектура допускает злоупотребление.',
      'Эта проблема закладывается на ранних этапах разработки. Если система спроектирована без учёта угроз, исправить это позже становится значительно сложнее и дороже.',
      'В основе Insecure Design лежит отсутствие анализа возможных атак. Разработчики фокусируются на функциональности, не задаваясь вопросом «как систему можно сломать».',
      'Простой пример — отсутствие ограничения попыток входа. Если система позволяет бесконечно вводить пароль, она уязвима к перебору даже при надёжном хэшировании.',
      'Другой пример — неправильная бизнес-логика: промокод, используемый бесконечно, или возврат средств без проверки покупки — это ошибки проектирования, а не кода.',
      'Особенно опасны сценарии, где приложение корректно выполняет все операции, но не учитывает нестандартные комбинации действий пользователя.',
      'Причины связаны с процессом разработки: отсутствие threat modeling, фокус только на функциональности, игнорирование сценариев злоупотребления.',
      'Последствия могут быть разнообразными — финансовые потери, обход ограничений, злоупотребление функционалом или полная компрометация бизнес-логики.',
      'Insecure Design особенно опасен тем, что масштабируется — ошибка в архитектуре проявляется в десятках разных мест приложения.',
      'Для защиты необходимо внедрять подход secure by design с самого начала разработки. Threat modeling позволяет рассматривать систему с точки зрения атакующего.',
      'Insecure Design напоминает, что безопасность начинается не с кода, а с идеи. Если система спроектирована без учёта угроз, никакие исправления на уровне реализации не решат проблему полностью.',
    ],
  },
  {
    id: 5,
    title: 'Security Misconfiguration',
    owaspPath: '/owasp-lab/security-misconfiguration',
    owaspLabel: '#5 Security Misconfiguration',
    paragraphsEn: [
      'Security Misconfiguration is one of the most common causes of system compromise. It arises from improper configuration of applications, servers, databases, and infrastructure — not from vulnerable code, but from simple configuration errors.',
      'Any system consists of many components, each requiring proper configuration. If even one component is misconfigured, it can open a path for an attacker to the entire system.',
      'A frequent example is debug mode enabled in production. Applications display detailed error messages including system structure, SQL queries, file paths, and technical details — invaluable for attackers.',
      'Using default or weak credentials is another common problem. Systems shipped with admin/admin or root/root credentials become vulnerable to the simplest attacks if administrators don\'t change them.',
      'Other common issues include open admin panels without protection, improperly configured file permissions, unnecessarily exposed ports, and unused features left enabled.',
      'The causes are typically human factors — developers or administrators rushing to deploy and leaving default settings. In other cases, there are no configuration standards or automated security checks.',
      'Cloud infrastructure misconfigurations are particularly dangerous. Open S3 buckets can lead to massive data leaks without any actual hacking — attackers simply know where to look.',
      'Consequences can be extremely severe — access to administrative functions, internal data, configuration files, or even the server operating system.',
      'Protection requires secure defaults, regular configuration audits checking open ports, access rights, and server settings.',
      'The attack surface must be minimized. If a component is not used, disable it. Separating development and production environments is essential.',
      'Security Misconfiguration demonstrates that even a well-written application can be completely compromised through configuration errors alone.',
    ],
    paragraphsRu: [
      'Security Misconfiguration — одна из самых распространённых причин компрометации систем, связанная с неправильной настройкой приложений и инфраструктуры. Проблема часто не в уязвимом коде, а в ошибках конфигурации.',
      'Любая система состоит из множества компонентов, каждый из которых требует правильной настройки. Если хотя бы один настроен неправильно, это открывает путь к всей системе.',
      'Одним из самых частых примеров является включённый debug-режим в продакшене. Приложение отображает внутреннюю структуру системы, SQL-запросы и пути к файлам — ценнейшую информацию для атакующих.',
      'Использование стандартных или слабых паролей — ещё одна распространённая проблема. Системы с учётными данными admin/admin или root/root уязвимы к самым простым атакам.',
      'Также часто встречаются открытые административные панели без защиты, неправильно настроенные права доступа, избыточно открытые порты и ненужные включённые функции.',
      'Причины обычно связаны с человеческим фактором — разработчики спешат развернуть систему и оставляют настройки по умолчанию.',
      'Ошибки в облачной инфраструктуре особенно опасны. Открытые S3 бакеты могут привести к массовой утечке данных без реального взлома.',
      'Последствия могут быть крайне серьёзными — доступ к административным функциям, внутренним данным, конфигурационным файлам или операционной системе.',
      'Защита строится на нескольких принципах: безопасные настройки по умолчанию и регулярный аудит конфигураций.',
      'Необходимо минимизировать поверхность атаки — отключать неиспользуемые компоненты и разделять среды разработки и продакшена.',
      'Security Misconfiguration показывает, что даже хорошо написанное приложение может быть полностью скомпрометировано из-за одной ошибки в конфигурации.',
    ],
  },
  {
    id: 6,
    title: 'Software Supply Chain Failures',
    owaspPath: '/owasp-lab/software-supply-chain',
    owaspLabel: '#6 Software Supply Chain Failures',
    paragraphsEn: [
      'Software Supply Chain Failures relate to the compromise or unreliability of components used during development. Modern applications depend on libraries, frameworks, packages, containers, and third-party APIs.',
      'Developers often blindly trust external dependencies. By including a library, they add code they didn\'t write and don\'t fully control. If compromised, it automatically becomes part of the final application.',
      'The most dangerous scenario is compromise of a popular library. If an attacker gains access to a maintainer\'s account, they can inject malicious code into an update that spreads to millions of projects.',
      'Using vulnerable library versions is also common — developers include a dependency with a known vulnerability but fail to update it.',
      'Package substitution attacks — where attackers publish packages with similar names for typosquatting — can execute hidden malicious actions if accidentally installed.',
      'Root causes involve blind trust in third-party libraries, lack of dependency version control, insufficient source verification, and no security analysis of external code.',
      'Consequences can be massive — since one library serves thousands of projects, a single compromise can trigger a chain reaction of data theft, backdoor installation, or remote code execution.',
      'Such attacks often go undetected for a long time because malicious code can look like a normal part of the library.',
      'Protection requires strict dependency control. Lock files pin specific versions preventing unexpected changes. SBOM (Software Bill of Materials) maintains a complete component inventory.',
      'Regularly auditing dependencies and minimizing their number reduces the attack surface significantly.',
      'Supply Chain Failures demonstrate that application security depends on the entire ecosystem, not just its own code. Even a perfectly protected application can be compromised through one external dependency.',
    ],
    paragraphsRu: [
      'Software Supply Chain Failures связаны с компрометацией или ненадёжностью компонентов, используемых при разработке. Современные приложения зависят от библиотек, фреймворков, пакетов, контейнеров и сторонних API.',
      'Разработчики часто слепо доверяют внешним зависимостям. Подключая библиотеку, они добавляют код, который не писали и не контролируют полностью.',
      'Наиболее опасный сценарий — компрометация популярной библиотеки. Если атакующий получает доступ к аккаунту разработчика, он может внедрить вредоносный код в обновление, которое распространится на миллионы проектов.',
      'Также распространено использование уязвимых версий библиотек — разработчики подключают зависимость с известной уязвимостью, но не обновляют её.',
      'Атаки подмены пакетов — публикация пакетов с похожими названиями — могут выполнять скрытые вредоносные действия при случайной установке.',
      'Причины связаны со слепым доверием к сторонним библиотекам, отсутствием контроля версий зависимостей и проверки источников.',
      'Последствия могут быть масштабными — одна библиотека используется тысячами проектов, и одна компрометация вызывает цепную реакцию: кражу данных, установку backdoor или удалённое выполнение кода.',
      'Такие атаки часто остаются незамеченными длительное время, так как вредоносный код выглядит как обычная часть библиотеки.',
      'Защита требует строгого контроля зависимостей. Lock-файлы фиксируют конкретные версии, SBOM ведёт полный реестр компонентов.',
      'Регулярный аудит зависимостей и минимизация их количества значительно снижают поверхность атаки.',
      'Supply Chain Failures показывают, что безопасность приложения зависит от всей экосистемы, а не только от собственного кода.',
    ],
  },
  {
    id: 7,
    title: 'Authentication Failures',
    owaspPath: '/owasp-lab/authentication-failures',
    owaspLabel: '#7 Authentication Failures',
    paragraphsEn: [
      'Authentication Failures relate to improper implementation of user authentication. Authentication verifies user identity, and any errors here directly lead to the risk of unauthorized access.',
      'The core problem is that a system either checks users too weakly or incorrectly. As a result, attackers can gain access to others\' accounts or bypass protections.',
      'One of the most common causes is weak passwords. Without complexity requirements, users choose simple combinations easy to brute-force.',
      'Absence of login attempt limits enables automated brute-force attacks using millions of password combinations.',
      'Missing multi-factor authentication (MFA) means a stolen password alone can lead to full account compromise.',
      'Improper session management — tokens without expiration or predictable session IDs — allows hijacking without knowing the password.',
      'Insecure password recovery mechanisms where reset processes lack proper identity verification can be exploited for account takeover.',
      'Root causes involve simplifying user experience at the expense of security, absent modern security standards, and improper session and token implementation.',
      'Consequences can be extremely severe — full access to user accounts including personal data, financial information, and administrative functions.',
      'Protection requires a multilayered approach: strong password requirements, login attempt limits, and MFA implementation with secure session lifetimes.',
      'Authentication Failures demonstrate that even the basic login process can become a critical vulnerability if implemented without adequate security.',
    ],
    paragraphsRu: [
      'Authentication Failures связаны с неправильной реализацией механизмов аутентификации пользователей. Аутентификация проверяет личность пользователя, и любые ошибки здесь приводят к риску несанкционированного доступа.',
      'Суть проблемы в том, что система либо слишком слабо проверяет пользователя, либо делает это неправильно. В результате атакующий может получить доступ к чужим аккаунтам.',
      'Одна из самых распространённых причин — использование слабых паролей. Без требований к сложности пользователи выбирают комбинации, легко поддающиеся перебору.',
      'Отсутствие ограничений на попытки входа позволяет автоматизированные brute force атаки с миллионами комбинаций паролей.',
      'Отсутствие многофакторной аутентификации (MFA) означает, что одного украденного пароля достаточно для полной компрометации аккаунта.',
      'Неправильная работа с сессиями — токены без срока действия или предсказуемые идентификаторы — позволяет перехватить сессию без знания пароля.',
      'Небезопасные механизмы восстановления пароля без должной проверки личности могут быть использованы для захвата аккаунта.',
      'Причины связаны с упрощением пользовательского опыта в ущерб безопасности, отсутствием современных стандартов и неправильной реализацией сессий.',
      'Последствия могут быть крайне серьёзными — полный доступ к аккаунту пользователя: личные данные, финансовая информация, административные функции.',
      'Защита требует многоуровневого подхода: строгие требования к паролям, ограничение попыток входа, внедрение MFA и безопасное управление сессиями.',
      'Authentication Failures показывают, что даже базовый процесс входа может стать критической точкой уязвимости при недостаточном уровне безопасности.',
    ],
  },
  {
    id: 8,
    title: 'Data Integrity Failures',
    owaspPath: '/owasp-lab/data-integrity',
    owaspLabel: '#8 Data Integrity Failures',
    paragraphsEn: [
      'Data Integrity Failures relate to situations where data can be modified, substituted, or corrupted without the system detecting it. The application loses certainty that its information is authentic and unaltered.',
      'Data integrity is a key principle of information security alongside confidentiality and availability. It guarantees that data has not been altered by attackers or errors without detection.',
      'Problems arise when a system doesn\'t verify the source of information or lacks mechanisms for confirming authenticity — during transmission, storage, or processing.',
      'A typical example is absent authenticity verification for client-received data. Without digital signatures or integrity checks, attackers can modify data before it reaches the system.',
      'Insecure data updates — allowing modification of critical parameters without authorization checks — enable information substitution, especially dangerous in financial and medical systems.',
      'Absent data versioning means if a system can\'t determine who changed information and when, detecting substitution or rolling back becomes impossible.',
      'Root causes include absent integrity check mechanisms (hashes, signatures), trust in external data sources, weak authorization for data modification.',
      'Consequences can be critical — data substitution leads to financial losses, distorted reporting, decision-making errors, and system failures.',
      'Protection requires implementing integrity verification: hash functions, digital signatures, and cryptographic authentication mechanisms.',
      'Any modification of critical data should pass strict access rights checks and be logged. Data versioning enables restoration of previous states.',
      'Data Integrity Failures demonstrate that security means not only protecting against leaks but guaranteeing data remains unchanged and authentic.',
    ],
    paragraphsRu: [
      'Data Integrity Failures связаны с ситуациями, когда данные могут быть изменены, подменены или повреждены без обнаружения системой. Приложение теряет уверенность в достоверности и неизменности данных.',
      'Целостность данных — ключевой принцип информационной безопасности наряду с конфиденциальностью и доступностью. Она гарантирует, что данные не были изменены без контроля.',
      'Проблемы возникают, когда система не проверяет источник информации или не имеет механизмов подтверждения подлинности — при передаче, хранении или обработке.',
      'Типичный пример — отсутствие проверки подлинности данных, полученных от клиента. Без цифровой подписи атакующий может изменить данные до их попадания в систему.',
      'Небезопасные обновления данных — изменение критических параметров без проверки авторизации — позволяют подмену информации, особенно опасную в финансовых и медицинских системах.',
      'Отсутствие контроля версий данных делает невозможным определение, кто и когда изменил информацию, а также откат к предыдущему состоянию.',
      'Причины включают отсутствие механизмов проверки целостности (хэшей, подписей), доверие к внешним источникам, слабую авторизацию при изменении данных.',
      'Последствия могут быть критическими — подмена данных приводит к финансовым потерям, искажению отчётности и ошибкам в принятии решений.',
      'Для защиты необходимо внедрять механизмы проверки целостности: хэш-функции, цифровые подписи и криптографические механизмы аутентификации.',
      'Любое изменение критических данных должно проходить строгую проверку прав доступа и логироваться. Контроль версий позволяет откатывать данные.',
      'Data Integrity Failures показывают, что безопасность — это не только защита от утечек, но и гарантия достоверности и неизменности данных.',
    ],
  },
  {
    id: 9,
    title: 'Security Logging and Monitoring Failures',
    owaspPath: '/owasp-lab/security-logging',
    owaspLabel: '#9 Security Logging Failures',
    paragraphsEn: [
      'Security Logging and Monitoring Failures relate to the absence or insufficiency of security event logging and monitoring. These problems critically impair the ability to detect, analyze, and respond to attacks.',
      'Logging and monitoring are the foundation of system visibility. Without them, any attack can proceed unnoticed and consequences only become clear after the damage is done.',
      'The core problem is when a system fails to record important security events. Login attempts, access rights changes, access to sensitive data, and authentication errors must be logged.',
      'Insufficient log detail — events recorded without IP, timestamp, user identifier, or action context — makes logs practically useless for incident investigation.',
      'Absent centralized log storage means distributed logs across different systems make analysis complex and slow, reducing incident response speed.',
      'Lack of real-time monitoring provides no protection — if nobody analyzes the data, attacks can go undetected for extended periods.',
      'Root causes include underestimating the importance of logging, attempting to reduce system load by disabling logs, and absent centralized monitoring tools.',
      'Consequences are severe — without logs, understanding how a breach occurred is impossible, complicating vulnerability remediation and increasing the risk of repeated attacks.',
      'Without monitoring, attacks can\'t be detected in time. An attacker may remain in the system for an extended period, gradually expanding access — an APT (Advanced Persistent Threat).',
      'Protection requires centralized logging and automated monitoring through SIEM systems. Both errors and successful actions must be logged, with alerts for critical events.',
      'Security Logging Failures demonstrate that protection doesn\'t end at attack prevention — being able to see and respond to attacks quickly is equally important.',
    ],
    paragraphsRu: [
      'Security Logging and Monitoring Failures связаны с отсутствием или недостаточностью механизмов логирования и мониторинга событий безопасности. Эти проблемы критически ухудшают способность обнаруживать атаки и реагировать на них.',
      'Логирование и мониторинг — основа видимости системы. Без них любая атака может происходить незаметно, а последствия становятся очевидными только после нанесения ущерба.',
      'Основная проблема — когда система не записывает важные события безопасности: попытки входа, изменения прав доступа, обращения к чувствительным данным.',
      'Недостаточная детализация логов — события без IP, метки времени, идентификатора пользователя — делает их практически бесполезными для расследования.',
      'Отсутствие централизованного хранения логов делает анализ сложным и медленным, снижая скорость реагирования на инциденты.',
      'Отсутствие мониторинга в реальном времени не даёт защиты — если данные никто не анализирует, атаки могут оставаться незамеченными длительное время.',
      'Причины включают недооценку важности логирования, попытки снизить нагрузку за счёт отключения логов, отсутствие централизованных инструментов.',
      'Последствия серьёзны — без логов невозможно понять, как произошёл взлом, что затрудняет устранение уязвимостей и увеличивает риск повторных атак.',
      'Без мониторинга невозможно своевременно обнаружить атаку. Злоумышленник может длительное время расширять доступ — это называется APT (продвинутая постоянная угроза).',
      'Для защиты необходимо внедрять централизованное логирование и автоматизированный мониторинг через SIEM-системы с оповещениями о критических событиях.',
      'Security Logging Failures показывают, что защита не заканчивается на предотвращении атак — важно также видеть атаки и быстро на них реагировать.',
    ],
  },
  {
    id: 10,
    title: 'Mishandling of Exceptional Conditions',
    owaspPath: '/owasp-lab/mishandling-exceptions',
    owaspLabel: '#10 Mishandling of Exceptions',
    paragraphsEn: [
      'Mishandling of Exceptional Conditions arises from improper error handling and exception management. These situations often lead to information leaks, application instability, and exposure of internal system structure.',
      'Any software encounters errors: incorrect input, service failures, database unavailability. The problem lies not in the errors themselves but in how the system responds to them.',
      'One of the most common problems is revealing technical information to users. Applications displaying detailed stack traces, SQL queries, file paths, or configuration data help attackers plan further attacks.',
      'Absent proper exception handling can cause applications to crash or enter incorrect states, leading to service denial or data loss.',
      'A dangerous situation arises when error messages differ enough to allow attackers to determine whether a user exists or verify the correctness of data.',
      'Root causes involve absent unified error handling mechanisms, insufficient testing of negative scenarios, and debug modes enabled in production.',
      'Consequences range from the system appearing unstable to attackers gaining access to internal information enabling more sophisticated attacks.',
      'It\'s especially dangerous when errors reveal database details, server configuration, or API structure. Beyond leaks, improper handling can cause cascading failures.',
      'Protection requires properly designing error handling. All exceptions must be caught and handled at the application level — users must never see technical error details.',
      'Technical information should be saved in logs but never exposed externally. Using different logging levels and disabling debug mode in production are essential.',
      'Mishandling of Exceptional Conditions shows that even ordinary errors become vulnerability sources if handled improperly.',
    ],
    paragraphsRu: [
      'Mishandling of Exceptional Conditions возникает из-за неправильной обработки ошибок и исключительных ситуаций. Такие ситуации часто приводят к утечкам информации, нестабильной работе приложений и раскрытию внутренней структуры системы.',
      'Любое программное обеспечение сталкивается с ошибками: неправильный ввод, сбои сервисов, недоступность базы данных. Проблема не в самих ошибках, а в том, как система на них реагирует.',
      'Одна из самых распространённых проблем — раскрытие технической информации пользователю. Приложения, отображающие stack trace, SQL-запросы или пути к файлам, помогают атакующим планировать дальнейшие атаки.',
      'Отсутствие корректной обработки исключений приводит к аварийному завершению работы или некорректному состоянию системы, что может означать отказ в обслуживании.',
      'Опасная ситуация возникает, когда сообщения об ошибках различаются настолько, что атакующий может определить, существует ли пользователь, или проверить правильность данных.',
      'Причины связаны с отсутствием единого механизма обработки ошибок, недостаточным тестированием негативных сценариев и использованием debug-режимов в продакшене.',
      'Последствия варьируются от нестабильного вида системы до получения атакующим внутренней информации для более сложных атак.',
      'Особенно опасно, когда ошибки раскрывают детали базы данных или структуру API. Кроме утечек, неправильная обработка исключений может вызвать каскадные сбои.',
      'Для защиты необходимо правильно проектировать систему обработки ошибок. Все исключения перехватываются на уровне приложения — пользователь никогда не видит технические детали.',
      'Техническая информация сохраняется в логах, но не выводится наружу. Использование разных уровней логирования и отключение debug-режима в продакшене обязательны.',
      'Mishandling of Exceptional Conditions показывает, что даже обычные ошибки становятся источниками уязвимости при неправильной обработке.',
    ],
  },
];

// ─── Артикулы для социо-технических угроз ────────────────────────────────────────────────

interface SocioArticle {
  id: number;
  titleEn: string;
  titleRu: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  threatPath: string;
  threatLabelEn: string;
  threatLabelRu: string;
  paragraphsEn: string[];
  paragraphsRu: string[];
}

const socioArticles: SocioArticle[] = [
  {
    id: 1,
    titleEn: 'Social Engineering',
    titleRu: 'Социальная инженерия',
    icon: Users,
    color: 'from-red-500 to-rose-600',
    threatPath: '/threats/social-engineering',
    threatLabelEn: 'Explore — Social Engineering',
    threatLabelRu: 'Перейти к угрозе — Социальная инженерия',
    paragraphsEn: [
      'Social Engineering is a method of attack where the attacker targets not the system but the person, forcing them to voluntarily reveal information or perform required actions. Unlike technical hacks, there is no need to find vulnerabilities in code or infrastructure — psychology, trust, and inattentiveness are sufficient.',
      'The foundation of social engineering is manipulation. The attacker may pose as a company employee, support service, bank, or even an acquaintance. They construct a scenario where the victim feels urgency, fear, or trust, and acts without proper verification. Common pretexts include "urgent security check," "problem with your account," or "need to confirm your details."',
      'One of the most common tools is phishing — sending emails or messages that look official. The user is asked to click a link, enter credentials, or download a file. More sophisticated attacks use spear phishing — personalized messages tailored to specific targets.',
      'Telephone attacks (vishing) are also used, where the attacker calls and convinces a person to share data or perform actions. In some cases, pressure or even elements of blackmail are applied to accelerate decision-making.',
      'The main reason these attacks succeed is the human factor. People tend to trust authority, react to urgency, and don\'t always verify information. This makes social engineering extremely effective even against well-protected systems.',
      'Defense includes user training, verification of all suspicious requests, and implementation of multi-factor authentication. It is important to develop the habit of double-checking any information, especially if it relates to access credentials or money.',
      'Social Engineering remains one of the most dangerous threats because it bypasses technology and attacks human behavior itself.',
    ],
    paragraphsRu: [
      'Social Engineering — это метод атак, при котором злоумышленник воздействует не на систему, а на человека, вынуждая его добровольно раскрыть информацию или выполнить нужные действия. В отличие от технических взломов, здесь не требуется искать уязвимости в коде или инфраструктуре — достаточно использовать психологию, доверие и невнимательность.',
      'Основой социальной инженерии является манипуляция. Атакующий может представиться сотрудником компании, службой поддержки, банком или даже знакомым человеком. Он выстраивает сценарий, в котором жертва чувствует срочность, страх или доверие, и действует без должной проверки. Часто используются предлоги вроде "срочная проверка безопасности", "проблема с аккаунтом" или "необходимо подтвердить данные".',
      'Одним из самых распространённых инструментов является фишинг — отправка писем или сообщений, которые выглядят как официальные. Пользователя просят перейти по ссылке, ввести логин и пароль или скачать файл. В более сложных атаках применяется spear phishing — персонализированные сообщения, учитывающие конкретную жертву.',
      'Также используются телефонные атаки (vishing), когда злоумышленник звонит и убеждает человека сообщить данные или выполнить действия. В некоторых случаях применяется давление или даже элементы шантажа, чтобы ускорить принятие решения.',
      'Главная причина успешности таких атак — человеческий фактор. Люди склонны доверять авторитету, реагировать на срочность и не всегда проверяют информацию. Это делает социальную инженерию крайне эффективной даже против защищённых систем.',
      'Защита включает обучение пользователей, проверку всех подозрительных запросов и внедрение многофакторной аутентификации. Важно выработать привычку перепроверять любую информацию, особенно если она связана с доступами или деньгами.',
      'Social Engineering остаётся одной из самых опасных угроз, потому что она обходит технологии и атакует человеческое поведение.',
    ],
  },
  {
    id: 2,
    titleEn: 'AI Fraud',
    titleRu: 'ИИ-мошенничество',
    icon: Sparkles,
    color: 'from-orange-500 to-amber-600',
    threatPath: '/threats/ai-fraud',
    threatLabelEn: 'Explore — AI Fraud',
    threatLabelRu: 'Перейти к угрозе — ИИ-мошенничество',
    paragraphsEn: [
      'AI Fraud is a form of fraud where attackers use artificial intelligence technologies to impersonate individuals, create convincing content, and automate deception. Unlike classic attacks, the key is realism: the victim encounters not an obvious fake but a plausible copy of a person or message.',
      'One of the main tools is deepfake technology. It allows creating videos where a person speaks and behaves as if it were really them, even though the recording is entirely AI-generated. Such materials can be used for financial fraud, pressure on employees, or spreading false information.',
      'Voice synthesis and modification technologies are equally dangerous. Modern models can imitate a specific person\'s voice with high accuracy, sometimes even in real-time. This allows attackers to call victims posing as a manager, colleague, or relative, and demand urgent actions.',
      'Generative models are also actively used to create texts — writing convincing letters, messages, and communication scripts adapted to a specific organization or person. This makes phishing more precise and harder to recognize.',
      'The distinguishing feature of AI Fraud is scalability. Attackers can quickly create a large number of personalized attacks, significantly increasing their effectiveness.',
      'The main risk is related to trust in visual and audio information. People are accustomed to considering voice and video as proof of authenticity, but modern technologies make this unreliable.',
      'For protection, it is necessary to implement multi-level verification of actions, especially financial and administrative ones. It is important to use additional confirmation channels and train users to recognize signs of forgery.',
      'AI Fraud represents a new stage in the development of fraud, where technology amplifies human weaknesses, making attacks more precise, convincing, and dangerous.',
    ],
    paragraphsRu: [
      'AI Fraud — это форма мошенничества, при которой злоумышленники используют технологии искусственного интеллекта для имитации личности, создания убедительного контента и автоматизации обмана. В отличие от классических атак, здесь ключевую роль играет реалистичность: жертва сталкивается не с очевидной подделкой, а с правдоподобной копией человека или сообщения.',
      'Одним из главных инструментов являются deepfake-технологии. С их помощью можно создавать видео, где человек говорит и ведёт себя так, будто это реально он, хотя запись полностью сгенерирована. Такие материалы могут использоваться для финансовых махинаций, давления на сотрудников или распространения ложной информации.',
      'Не менее опасны технологии синтеза и изменения голоса. Современные модели способны имитировать голос конкретного человека с высокой точностью, иногда даже в реальном времени. Это позволяет злоумышленникам звонить жертвам, выдавая себя за руководителя, коллегу или родственника, и требовать срочных действий.',
      'Также активно применяются генеративные модели для создания текстов. Они позволяют писать убедительные письма, сообщения и сценарии общения, адаптированные под конкретную организацию или человека. Это делает фишинг более точным и сложным для распознавания.',
      'Особенность AI Fraud — масштабируемость. Злоумышленники могут быстро создавать большое количество персонализированных атак, что значительно увеличивает их эффективность.',
      'Основной риск связан с доверием к визуальной и аудиальной информации. Люди привыкли считать голос и видео доказательством подлинности, но современные технологии делают это ненадёжным.',
      'Для защиты необходимо внедрять многоуровневую проверку действий, особенно финансовых и административных. Важно использовать дополнительные каналы подтверждения и обучать пользователей распознавать признаки подделки.',
      'AI Fraud — это новый этап развития мошенничества, где технологии усиливают человеческие слабости, делая атаки более точными, убедительными и опасными.',
    ],
  },
  {
    id: 3,
    titleEn: 'OSINT',
    titleRu: 'OSINT',
    icon: Database,
    color: 'from-yellow-500 to-amber-500',
    threatPath: '/threats/osint',
    threatLabelEn: 'Explore — OSINT',
    threatLabelRu: 'Перейти к угрозе — OSINT',
    paragraphsEn: [
      'OSINT is a method of collecting and analyzing information from open sources. Unlike hacking or unauthorized access, only legally accessible data is used: websites, social networks, forums, public databases, news, and other open resources. Despite this, OSINT can provide an extremely accurate and detailed picture of a person, company, or system.',
      'The main power of OSINT lies in combining disparate data. Individual facts may seem insignificant, but with proper analysis they form a complete dossier. A social media profile may contain information about work, interests, and social circle. Combined with data breaches, public documents, and forum comments, this allows building a detailed target profile.',
      'OSINT is widely used in cybersecurity, journalism, and investigations. Specialists use it to find vulnerabilities, analyze threats, and verify information. However, the same methods are actively used by attackers — they collect data about targets to make attacks more precise and convincing.',
      'For example, knowing a company\'s structure and employee names allows a targeted phishing attack. Information about technologies and infrastructure helps prepare technical attacks. Even details like habits or online activity can be used for manipulation.',
      'Reasons for OSINT\'s effectiveness: a huge amount of open data on the internet; users underestimating the importance of published information; lack of control over digital footprint; data breaches entering the public domain.',
      'The consequences of uncontrolled OSINT can include personal information leaks, preparation of targeted attacks, and account compromise. Users often publish enough data on their own to become easy targets.',
      'For protection, it is important to control your digital footprint. Limit the amount of information published, especially related to work, access credentials, and personal data. Regularly check what data about you is available in open sources.',
      'Companies should train employees and implement information security policies to minimize leaks through open channels.',
      'OSINT shows that even open information can be a powerful tool — for both defense and attack. Everything depends on who uses it and how.',
    ],
    paragraphsRu: [
      'OSINT — это метод сбора и анализа информации из открытых источников. В отличие от взлома или несанкционированного доступа, здесь используются только легально доступные данные: сайты, социальные сети, форумы, публичные базы, новости и другие открытые ресурсы. Несмотря на это, OSINT может давать крайне точную и детализированную картину о человеке, компании или системе.',
      'Основная сила OSINT заключается в объединении разрозненных данных. Отдельно взятые факты могут казаться незначительными, но при грамотном анализе они складываются в полное досье. Например, профиль в социальной сети может содержать информацию о работе, интересах и окружении. В сочетании с утечками данных и публичными документами это позволяет выстроить подробный профиль цели.',
      'OSINT широко используется в кибербезопасности, журналистике и расследованиях. Специалисты применяют его для поиска уязвимостей, анализа угроз и проверки информации. Однако те же методы активно используют злоумышленники. Перед атакой они собирают данные о жертве, чтобы сделать свои действия более точными и убедительными.',
      'Например, зная структуру компании и имена сотрудников, атакующий может провести целевую фишинговую атаку. Информация о технологиях и инфраструктуре помогает подготовить технические атаки. Даже такие детали, как привычки пользователя или его активность в сети, могут использоваться для манипуляции.',
      'Причины эффективности OSINT: огромное количество открытых данных в интернете; недооценка пользователями важности публикуемой информации; отсутствие контроля за цифровым следом; утечки данных, попадающие в открытый доступ.',
      'Последствия неконтролируемого OSINT могут включать утечку личной информации, подготовку targeted-атак и компрометацию аккаунтов. Часто пользователи сами публикуют достаточно данных, чтобы стать лёгкой целью.',
      'Для защиты важно контролировать свой цифровой след. Необходимо ограничивать количество публикуемой информации, особенно связанной с работой, доступами и личными данными. Также рекомендуется регулярно проверять, какие данные о вас доступны в открытых источниках.',
      'Компаниям следует обучать сотрудников и внедрять политики информационной безопасности, чтобы минимизировать утечки через открытые каналы.',
      'OSINT показывает, что даже открытая информация может быть мощным инструментом — как для защиты, так и для атаки. Всё зависит от того, кто и как её использует.',
    ],
  },
];

// ─── Компоненты ───────────────────────────────────────────────────────────────

export function Articles() {
  const { language } = useTheme();
  const t = translations[language];
  const [category, setCategory] = useState<'technical' | 'sociotechnical'>('technical');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const isTech = category === 'technical';
  const articles = isTech ? techArticles : socioArticles;
  const article = articles[currentPage];

  const goToPage = (page: number) => {
    if (page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    setTimeout(() => {
      document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const switchCategory = (cat: 'technical' | 'sociotechnical') => {
    if (cat === category) return;
    setCategory(cat);
    setCurrentPage(0);
    setDirection(0);
  };

  const goNext = () => { if (currentPage < articles.length - 1) goToPage(currentPage + 1); };
  const goPrev = () => { if (currentPage > 0) goToPage(currentPage - 1); };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const techArt = article as TechArticle;
  const socioArt = article as SocioArticle;
  const paragraphs = isTech
    ? (language === 'en' ? techArt.paragraphsEn : techArt.paragraphsRu)
    : (language === 'en' ? socioArt.paragraphsEn : socioArt.paragraphsRu);

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {language === 'ru' ? 'Назад на главную' : 'Back to Homepage'}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.25 }}
      >
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
          {language === 'ru' ? 'Теория угроз' : 'Threat Theory'}
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">
          {language === 'ru' ? 'Глубокое изучение киберугроз' : 'In-depth cybersecurity threat analysis'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="grid grid-cols-2 gap-3"
      >
        {(
          [
            {
              key: 'technical' as const,
              label: t.technicalThreats,
              sublabel: language === 'ru' ? 'OWASP Top 10 · 10 статей' : 'OWASP Top 10 · 10 articles',
              Icon: FlaskConical,
              accent: 'var(--accent-primary)',
              accentRaw: '#3b82f6',
            },
            {
              key: 'sociotechnical' as const,
              label: t.sociotechnicalThreats,
              sublabel: language === 'ru' ? 'Человеческий фактор · 3 статьи' : 'Human Factor · 3 articles',
              Icon: Users,
              accent: '#7c3aed',
              accentRaw: '#7c3aed',
            },
          ] as const
        ).map((tab) => {
          const isActive = category === tab.key;
          return (
            <motion.button
              key={tab.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => switchCategory(tab.key)}
              className="relative flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden"
              style={{
                borderColor: isActive ? tab.accentRaw : 'var(--border-primary)',
                background: isActive
                  ? `color-mix(in srgb, ${tab.accentRaw} 10%, var(--bg-primary))`
                  : 'var(--bg-primary)',
                boxShadow: isActive ? `0 4px 16px color-mix(in srgb, ${tab.accentRaw} 20%, transparent)` : 'none',
              }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: tab.accentRaw }}
              />

              <div
                className="shrink-0 p-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: isActive
                    ? `color-mix(in srgb, ${tab.accentRaw} 18%, transparent)`
                    : 'var(--hover-bg)',
                }}
              >
                <tab.Icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color: isActive ? tab.accentRaw : 'var(--text-secondary)' }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold truncate transition-colors duration-200"
                  style={{ color: isActive ? tab.accentRaw : 'var(--text-primary)' }}
                >
                  {tab.label}
                </div>
                <div
                  className="text-xs mt-0.5 truncate"
                  style={{ color: 'var(--text-secondary)', opacity: 0.75 }}
                >
                  {tab.sublabel}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {articles.map((a, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              title={isTech ? (a as TechArticle).title : (language === 'en' ? (a as SocioArticle).titleEn : (a as SocioArticle).titleRu)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentPage
                  ? 'bg-[var(--accent-primary)] w-8'
                  : 'bg-[var(--border-primary)] hover:bg-[var(--accent-primary)] opacity-60 w-2'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-[var(--text-secondary)]">
          {language === 'ru' ? 'Статья' : 'Article'} {currentPage + 1} / {articles.length}
        </span>
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${category}-${currentPage}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-2xl shadow-md overflow-hidden"
        >
          {isTech ? (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
                  #{techArt.id} OWASP Top 10
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold">{techArt.title}</h2>
            </div>
          ) : (
            <div className={`bg-gradient-to-r ${socioArt.color} px-8 py-6`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  {(() => { const Icon = socioArt.icon; return <Icon className="w-7 h-7 text-white" />; })()}
                </div>
                <div>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wide">
                    {language === 'ru' ? 'Социотехнические угрозы' : 'Socio-technical Threats'}
                  </span>
                  <h2 className="text-white text-2xl font-bold mt-0.5">
                    {language === 'en' ? socioArt.titleEn : socioArt.titleRu}
                  </h2>
                </div>
              </div>
            </div>
          )}

          <div className="px-8 py-6 space-y-4">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="text-[var(--text-secondary)] leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {isTech && (
            <div className="px-8 pb-8">
              <div className="border-t border-[var(--border-primary)] pt-6">
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {language === 'ru'
                    ? 'Хотите попрактиковаться на интерактивном симуляторе?'
                    : 'Want to practice with an interactive simulator?'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(techArt.owaspPath)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <FlaskConical className="w-5 h-5" />
                  {language === 'ru'
                    ? `Перейти в Лабораторию — ${techArt.owaspLabel}`
                    : `Go to Lab — ${techArt.owaspLabel}`}
                </motion.button>
              </div>
            </div>
          )}

          {!isTech && (
            <div className="px-8 pb-8">
              <div className="border-t border-[var(--border-primary)] pt-6">
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {language === 'ru'
                    ? 'Хотите изучить эту угрозу в интерактивном разделе?'
                    : 'Want to explore this threat in the interactive section?'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(socioArt.threatPath)}
                  className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${socioArt.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
                >
                  <Shield className="w-5 h-5" />
                  {language === 'ru' ? socioArt.threatLabelRu : socioArt.threatLabelEn}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={goPrev}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          {language === 'ru' ? 'Предыдущая' : 'Previous'}
        </motion.button>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          {articles.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToPage(i)}
              className={`w-8 h-8 rounded-lg text-sm transition-all border ${
                i === currentPage
                  ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-md border-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] border-[var(--border-primary)]'
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={goNext}
          disabled={currentPage === articles.length - 1}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {language === 'ru' ? 'Следующая' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
