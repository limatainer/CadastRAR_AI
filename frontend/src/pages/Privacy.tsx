import { NavLink } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <div className="mb-8">
            <NavLink
              to="/register"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-500 inline-flex items-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sign Up
            </NavLink>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="txtComments">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account Information:</strong> Name, email address, and password</li>
              <li><strong>Profile Information:</strong> Display name and any content you post</li>
              <li><strong>Usage Information:</strong> How you interact with our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, maintain, and improve our Service</li>
              <li>Create and manage your account</li>
              <li>Send you technical notices and security alerts</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
              <li><strong>For legal reasons:</strong> If required by law or to protect rights and safety</li>
              <li><strong>Service providers:</strong> With third parties who provide services on our behalf (like Firebase)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Storage and Security</h2>
            <p>
              We use Firebase, a Google service, to store and manage your data. Your information is stored securely
              using industry-standard encryption and security measures.
            </p>
            <p className="mt-2">
              Your password is hashed and salted by Firebase Authentication and is never stored in plain text.
              We implement additional client-side security measures for password validation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Session Management</h2>
            <p>
              We use Firebase Authentication persistence to manage your login sessions:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Local Persistence:</strong> If you choose "Remember me", your session persists across browser restarts</li>
              <li><strong>Session Persistence:</strong> Without "Remember me", your session ends when you close your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Cookies and Tracking</h2>
            <p>
              We use Firebase's built-in authentication cookies to maintain your session. These are essential
              for the Service to function and cannot be disabled if you wish to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Object to processing of your information</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide you services.
              If you wish to delete your account, please contact us and we will delete your information within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you become aware that a child has provided us
              with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">10. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the contact
              form on our website.
            </p>
          </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <NavLink
              to="/register"
              className="btn"
            >
              I Understand, Back to Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
