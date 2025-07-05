import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Troubleshoot = () => {
  const [ip, setIP] = useState("");
  const scriptInjected = useRef(false);

  useEffect(() => {
    // Fetch public IP
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIP(res.data.ip))
      .catch((err) => console.error("Failed to fetch IP address:", err));
  }, []);

  useEffect(() => {
    if (ip && !scriptInjected.current) {
      // Inject the RIPEstat widget API script once
      const script = document.createElement("script");
      script.src = "https://stat.ripe.net/widgets/widget_api.js";
      script.async = true;

      script.onload = () => {
        if (window.ripestat) {
          // Initialize whois widget with IP
          window.ripestat.init("whois", { resource: ip }, null, {
            size: "fit",
            disable: [
              "data",
              "embed-code",
              "logo",
              "feedback",
              "maximize",
              "permalink",
            ],
            show_controls: "yes",
            resource_input_text: "Please enter new resource",
          });

          // Initialize looking-glass widget (no IP param)
          window.ripestat.init("looking-glass", {}, null, {
            size: "fit",
            disable: [
              "data",
              "embed-code",
              "logo",
              "feedback",
              "maximize",
              "permalink",
            ],
            show_controls: "yes",
            resource_input_text: "Please enter IP here",
          });

          // Initialize bgplay widget (optional: comment out if not working)
          window.ripestat.init("bgplay", {}, null, {
            size: "fit",
            disable: [
              "data",
              "embed-code",
              "logo",
              "feedback",
              "maximize",
              "permalink",
            ],
            show_controls: "yes",
            resource_input_text: "Please enter new resource",
          });

          // Initialize geoloc widget (no IP param)
          window.ripestat.init("geoloc", {}, null, {
            size: "fit",
            disable: [
              "data",
              "embed-code",
              "logo",
              "feedback",
              "maximize",
              "permalink",
            ],
            show_controls: "yes",
            resource_input_text: "Please enter new resource",
          });
        }
      };

      document.body.appendChild(script);
      scriptInjected.current = true;
    }
  }, [ip]);

  return (
    <div className="container p-4">
      <div className="bg-danger text-center text-white p-2 mb-3">
        <p>Your Public IP is: {ip}</p>
      </div>

      <div className="statwdgtauto mb-4" id="whois-widget"></div>
      <div className="statwdgtauto mb-4" id="looking-glass-widget"></div>
      <div className="statwdgtauto mb-4" id="bgplay-widget"></div>
      <div className="statwdgtauto mb-4" id="geoloc-widget"></div>
    </div>
  );
};

export default Troubleshoot;
