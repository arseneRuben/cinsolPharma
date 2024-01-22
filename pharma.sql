




-- --------------------------------------------------------

--
-- Table structure for table `category` of products 
--
CREATE TABLE `categories` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table  product
--
CREATE TABLE `products` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `name` varchar(200) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `unit_price` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `threshold_qty` int(11) NOT NULL,
   FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Table structure for table  product
--
CREATE TABLE `stocks` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `product_id` int(11) NOT NULL,
  `purchased_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `qty` int(11) NOT NULL,
  `expiration_date` datetime NOT NULL,
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Table structure for service  
--
CREATE TABLE `services` (
  `id` int(11)   AUTO_INCREMENT  PRIMARY KEY,
  `name` varchar(200) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `normal_price` int(11) NOT NULL,
  `advertising_price` int(11) NOT NULL,
  `family_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Table structure for table group  
--
CREATE TABLE `groups` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `name` varchar(200) DEFAULT NULL);
  


  -- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `primary_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other_informations` longtext COLLATE utf8mb4_unicode_ci,
  `birthday` date NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthplace` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


 
  -- --------------------------------------------------------

--
-- Table structure for table role  
--
CREATE TABLE `roles` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `user_id` int(11) ,
  `group_id` int(11),
   UNIQUE KEY(`user_id`,`group_id`),
   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
   FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
);

 -- --------------------------------------------------------

--
-- Table structure for table `invoice`
--
 CREATE TABLE invoices (
           `id` int(11) AUTO_INCREMENT  PRIMARY KEY,
           `invoiceNumber` varchar(20) NOT NULL,
           `created_at` datetime DEFAULT current_timestamp(),
           `updated_at` datetime DEFAULT current_timestamp(),
           `partner_id` int(11) NOT NULL,
            FOREIGN KEY (`partner_id`) REFERENCES `users` (`id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `payment` of invoices 
--
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `invoice_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
    FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

   -- --------------------------------------------------------

--
-- Table structure for table `command`
--
 CREATE TABLE commands (
     `id` int(11) AUTO_INCREMENT  PRIMARY KEY,
     `invoice_id` int(11) NOT NULL,
     `amount` int(11) NOT NULL,
     `direction` int(1) DEFAULT 1,
     `staff_id` int(11) NOT NULL,
     FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
     FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`)


 );
  -- --------------------------------------------------------

--
-- Table structure for table `commandLine`
--
CREATE TABLE commandLines (
     `id` int(11) AUTO_INCREMENT  PRIMARY KEY,
     `item_id` int(11) NOT NULL,
     `command_id` int(11) NOT NULL,
     `unit_price` int(11) NOT NULL,
     `qty` int(3) DEFAULT 1,
     `staff_id` int(11) NOT NULL,
     FOREIGN KEY (`command_id`) REFERENCES `Commands` (`id`),
     FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`)

  );
   -- --------------------------------------------------------

--
-- Table structure for table medicalNodebook  
--
CREATE TABLE `medicalNotebooks` (
  `patient_id` int(11) ,
   `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
 );

     -- --------------------------------------------------------

--
-- Table structure for table medicalNodebook  
--
CREATE TABLE `reportEntries` (
  `id` int(11)  AUTO_INCREMENT  PRIMARY KEY,
  `notebook_id` int(11) ,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (`notebook_id`) REFERENCES `medicalNotebooks` (`id`)

 );