function About() {
  return (
    <>
      <main
        className=""
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1501696461415-6bd6660c6742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)`,
        }}
      >
        <section className="mx-2 md:mx-10 lg:mx-40 py-2 lg:py-5 ">
          <div className="  bg-slate-300 hover:bg-white hover:text-blue-400 hover:shadow-lg shadow-gray-400 transition-all duration-700 ease-in-out h-12 lg:h-20 flex justify-center items-center">
            <h1 className="text-xl lg:text-2xl font-bold  ">About Us</h1>
          </div>
          <div className="border-2 py-4 bg-slate-100">
            <article>
              <h1 className="font-bold text-md lg:text-lg px-5">
                What is Customer Realtionship Management (CRM) ?
              </h1>
              <p className="mx-5  px-0 lg:px-8 text-[0.9rem] lg:text-lg">
                Customer relationship management refers to the art of managing
                good customer relationships and prospective customers. It is all
                about understanding who your customers and potential customers
                are, and nurturing the relationships you have with them. It is
                about identifying client expectations and how you meet or go
                beyond their expectations.
              </p>
            </article>
            <hr className="border-1 border-black mt-4 mb-5"></hr>
            <article className="w-full">
              <div className="box-border flex flex-col  relative h-fit">
                
                <p className="about-paragraph ">
                  A customer relationship model seeks to improve the
                  relationship between a business and the customer. For this,
                  they drive new trends and provide profits for current and
                  future operations and investments.
                </p>
                <div className="w-[80%] mx-auto my-5 lg:my-0 border-2 border-black inline-block  lg:float-right  lg:w-1/2 object-contain">
                  <img
                    src="https://www.revechat.com/wp-content/uploads/2019/09/customer-relationship-model-1.jpg"
                    alt="about-crm-img"
                    className="w-fit "
                  />
                </div>
                <p className="about-paragraph ">
                  The below model is one approach to implement CRM.
                </p>
                <p className="about-paragraph ">
                  Customer relationship management model can be further
                  categorized into below stages
                </p>
              </div>
            </article>
            <hr className="border-top-4 border-black" />

            <div className="px-8 py-2">
              <details className="about-list">
                <summary>Awareness –</summary>
                <p className="list-par">
                  It is the first touchpoint where prospects try to know more
                  about your brand as a whole.
                </p>
              </details>
              <details className="about-list">
                <summary>Discovery –</summary>
                <p className="list-par">
                  Then you learn and identify the needs of the prospects and
                  share information to fulfill their requirements.
                </p>
              </details>
              <details className="about-list">
                <summary>Evaluation –</summary>
                <p className="list-par">
                  Moving ahead the prospects compare and evaluate your
                  products/services with your competitors.
                </p>
              </details>
              <details className="about-list">
                <summary>Intent –</summary>
                <p className="list-par">
                  Finally your prospect is convinced and made a decision of
                  buying from you.
                </p>
              </details>
              <details className="about-list">
                <summary>Purchase – </summary>
                <p className="list-par">
                  After making the payment the deal is done and the prospect
                  converts into your customer.
                </p>
              </details>
              <details className="about-list">
                <summary>Loyalty – </summary>
                <p className="list-par">
                  Make a follow-up after purchase to determine customer success
                  with your product and ask for referrals.{" "}
                </p>
              </details>
            </div>
          </div>

          <div className="about-footer"></div>
        </section>
      </main>
    </>
  );
}

export default About;
