import { NavLink } from 'react-router-dom';

export default function Terms() {
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
              Terms and Conditions
            </h1>
            <p className="txtComments">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CadastRAR, you accept and agree to be bound by the terms and provision of this agreement.
              If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information.
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p className="mt-2">
              You are responsible for safeguarding the password and for all activities that occur under your account.
              You agree not to disclose your password to any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. User Content</h2>
            <p>
              You retain all rights to the content you submit, post, or display on or through the Service.
              By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy,
              reproduce, process, adapt, modify, publish, transmit, display and distribute such content.
            </p>
            <p className="mt-2">
              You are solely responsible for the content you post and agree not to post content that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Violates any law or regulation</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains false or misleading information</li>
              <li>Is defamatory, obscene, or offensive</li>
              <li>Contains viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Privacy and Data Protection</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy. We collect, use, and protect your
              personal information as described in our{' '}
              <NavLink to="/privacy" className="text-primary-600 hover:underline dark:text-primary-500">
                Privacy Policy
              </NavLink>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Collect or store personal data about other users without consent</li>
              <li>Impersonate any person or entity</li>
              <li>Use automated systems to access the Service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="mt-2">
              Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties,
              expressed or implied, regarding the Service, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Limitation of Liability</h2>
            <p>
              In no event shall CadastRAR, its directors, employees, or agents be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out of or relating to your use
              of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material,
              we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us through the contact form on our website.
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
