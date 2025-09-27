# Zenith Ledger

An elegant and visually-driven personal expense tracker to calculate and visualize spending by day, week, month, and year.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/phamxuansy/Money-Mobile)

Zenith Ledger is a visually stunning and intuitive personal finance tracker designed for simplicity and elegance. The application allows users to effortlessly log their daily expenses and gain clear insights into their spending habits through a beautifully designed dashboard. Users can add transactions with details like amount, title, category, and date. The core feature is the ability to visualize and summarize these expenses aggregated by different time periods: daily, weekly, monthly, and yearly. The dashboard presents key metrics in prominent cards, a dynamic chart showing spending trends, and a list of recent transactions. The entire experience is crafted to be seamless, responsive, and aesthetically pleasing, making financial tracking a delightful and empowering activity.

## Key Features

- **Effortless Expense Logging**: Quickly add new transactions with amount, title, category, and date.
- **Dynamic Dashboard**: A central hub for all your financial insights.
- **Flexible Time Periods**: View and analyze your spending aggregated by Day, Week, Month, or Year.
- **Data Visualization**: Understand your spending trends at a glance with a beautiful, interactive chart.
- **Key Metric Summaries**: Prominent cards display total spend, top categories, and other important figures.
- **Recent Activity**: Keep track of your latest entries with a clear list of recent transactions.
- **Modern & Responsive UI**: A clean, 'glassmorphism' inspired design that looks great on any device.

## Technology Stack

- **Frontend**:
    - [React](https://react.dev/)
    - [Vite](https://vitejs.dev/)
    - [Tailwind CSS](https://tailwindcss.com/)
    - [shadcn/ui](https://ui.shadcn.com/)
    - [Recharts](https://recharts.org/) for charting
    - [Zustand](https://zustand-demo.pmnd.rs/) for state management
    - [Framer Motion](https://www.framer.com/motion/) for animations
- **Backend**:
    - [Cloudflare Workers](https://workers.cloudflare.com/)
    - [Hono](https://hono.dev/)
- **Database**:
    - [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- **Language**:
    - [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/zenith_ledger.git
    cd zenith_ledger
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server for the frontend and the Cloudflare Worker, run:

```bash
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Usage

Once the application is running, you can:

- **View the Dashboard**: The main screen provides an overview of your finances for the default time period (e.g., "This Month").
- **Change Time Period**: Use the toggle buttons to switch between daily, weekly, monthly, and yearly views. The dashboard components will update instantly.
- **Add an Expense**: Click the "Add Expense" button to open a form. Fill in the details and save to log a new transaction.

## Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Build the application:**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) installed and configured. Then, run the deploy command:
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/phamxuansy/Money-Mobile)

## License

This project is licensed under the MIT License.