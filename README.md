# SIZU: Comprehensive Platform for Sports Club Management and Uniform Ordering

Welcome to SIZU, a cutting-edge platform with the purpose of streamlining sports club management and ordering processes for local soccer clubs. The software is designed to serve club administrators, team managers, players, and fans. It simplifies uniform ordering, team management, and back-end operations, offering a seamless experience for all members involved in sports club activities.

From intuitive interfaces to robust back-end systems, SIZU aims to transform the way clubs handle team and order management, making it a game-changer in the sports industry.

### Key Features

1. **Dynamic Landing Page**

   - Engages users with an intuitive design.
   - Clear navigation for club administrators, managers, and players, allowing for quick access to relevant areas.

2. **Player Uniform Ordering System**

   - **Intuitive and Customized Design**: A clean, user-friendly uniform-kit ordering interface dynamically renders based on team code validation and provides fields custom to the team and player.
   - **Mobile Responsiveness**: Accessible on all devices.
   - **Visual Customization**: Real-time previews for customization.
   - **Sizing and Selection**: Interactive sizing chart, size recommendations, and double confirmation.

3. **Online Store: Fan Gear and Late Orders**

   - Team-branded apparel, accessories, and novelty items.
   - Modern filtering system with saved preferences for repeat customers.
   - Extended Ordering Window: Additional time for late or new team members.
   - Rush Processing Options: Expedited options for urgent orders.
   - Status Tracking: Dedicated tracking for late orders.

4. **Admin Backend**

   - **Order Compilation and Data Export**: Aggregates and customizes data for efficient processing.
   - **Scheduled Exports**: Automates data transfer to factories for timely production.

5. **Developer Backend**
   - **Database and API Integration**: Scalable, efficient database management with Supabase.
   - **Security and Processing**: Proper RLS and database security practices in place along with Clerk for user auth management.

## Current Tech Stack

- **Front End**:

  - **Framework**: Next.js 14 App Router, hosted on Vercel.
  - **Languages and Tools**: TypeScript and Tailwind CSS with basic shadcn ui components.

- **Back End**:

  - **Product Data**: Stored in WordPress/WooCommerce, functioning as a headless CMS.
  - **Data Fetching**: WooCommerce API for secure product data retrieval.
  - **Database**: Supabase for team, player, and club information. Team codes stored in the teams table.
  - **Server-side Actions**: Next.js server actions and route handlers for team code validation and secure data fetching.

- **State Management**:
  - **User Data**: React’s Context API to manage global state for customized product information in the cart.

## Integrations soon to come...

- **User Authentication**: Clerk will handle admin and coach authentication.
- **Payment Processing**: Stripe integration for secure payment handling.
