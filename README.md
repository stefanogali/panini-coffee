# Next.js + Headless Wordpress E-Commerce Template

This is a Next.Js + Typescript + Tailwindcss + headless Wordpress free starter template. This project uses the [Wordpress REST API](https://developer.wordpress.org/rest-api/) and the [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/#introduction).

![Hero Image](/public/template/screenshot.png?raw=true "Panini Coffee hero image")

A Next.js 14 and App Router-ready ecommerce template featuring:

- WordPress REST API
- WooCommerce REST API
- Next.js App Router
- Products filtering by category
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Custom React Hooks
- New fetching and caching paradigms
- Styling with Tailwind CSS

## Instructions for running locally

Please fork or clone the repo

```bash
https://github.com/stefanogali/panini-coffee.git
```

then install the dependencies with

```bash
npm install
```

You need to run Wordpress locally on your machine, you can use one of the different Local servers softwares (MAMP, XAMPP, Local etc.). After a fresh Wordpress installation, please add the [panini-coffee](wp-theme) theme in your Wordpress themes folder located inside **wp-content/themes**. In your Wordpress dashboard to Appereance -> Themes and activate the Panini Coffee theme. You will be then prompted to download and activate the [One Click Demo Plugin](wordpress.org/plugins/one-click-demo-import/). Please go ahead, this will add the 2 required Plugins (Advanced Custom fields and Woocommerce) and will populate the content for the pages. Activate the plugins if they are not automatically.

Woocommerce may ask you to set up your store, if so go ahead and once you finished go to WooCommerce -> Settings -> Advanced -> REST API and create the keys. You will create a Consumer Key and a Consumer Secret Key.

To run your Next.js app you will need to use the environment variables [defined in `.env.example`](.env.example)

```bash
# Example to run in localhost with MAMP or XAMPP
SITE_URL = "http://localhost:8888/folder_of_your_site"
PROTOCOL = "http"
HOSTNAME = "localhost"
HOSTNAMEPORT = "8888"
IMAGE_PATHNAME = "/folder_of_your_site/wp-content/uploads/**"
WOOCOMMERCECONSUMERKEY = "your_woocommerce_consumer_key"
WOOCOMMERCECONSUMERSECRET = "your_woocommerce_customer_secret"
```

Once replaced rename your file to .env.development, then you can run

```bash
npm run dev
```

and the Next.js app should be running on your local with no errors.

You can start adding more pages and products, extending the functionality and customizing based on your needs.
