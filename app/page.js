import Shortenform from "../src/components/shorten-form";
import UrlList from "../src/components/url_list";

const page = () => {
  return (
    <div className="mx-auto max-w-xl py-24 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">URL SHORTNER</h1>
        <p className="md:text-lg">
          Shorten your long URL and make it easy to share.
        </p>
        <div>
          <Shortenform />
          <UrlList />
        </div>
      </div>
    </div>
  );
};

export default page;
