import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Hotels in Ayodhya</h1>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide travelers with comprehensive, reliable
              information about hotels in Ayodhya, helping them find the perfect
              accommodation for their spiritual journey or business trip. Our
              platform offers detailed insights into various hotel categories,
              from luxury 5-star establishments to budget-friendly options.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Curated selection of hotels across different categories</li>
              <li>Detailed information about hotel amenities and services</li>
              <li>Transparent pricing and booking process</li>
              <li>Regular updates on special deals and promotions</li>
              <li>Local insights about Ayodhya's attractions and landmarks</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Verified Listings
                </h3>
                <p className="text-gray-600">
                  All hotels listed on our platform are thoroughly verified to
                  ensure accuracy of information and quality of service.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team has extensive knowledge of Ayodhya's hospitality
                  sector and can guide you to the best accommodations.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions or need assistance? Feel free to reach out to our
              customer support team. We're here to help make your stay in
              Ayodhya comfortable and memorable.
            </p>
            <div className="mt-4">
              <a
                href="mailto:support@hotelsinayodhya.com"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
