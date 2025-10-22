import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);

  // Mount the microfrontend once
  // Mount the microfrontend once
  useEffect(() => {
    if (!ref.current) {
      console.warn("Ref element not available for mounting");
      return;
    }

    try {
      const result = mount(ref.current, {
        initialPath: location.pathname,
        onNavigate: ({ pathname: nextPathname }) => {
          navigate(nextPathname);
        },
      });

      const { onParentNavigate } = result || {};

      if (!onParentNavigate) {
        console.log("no parent navigation found");
      }

      onParentNavigateRef.current = onParentNavigate;

      // Cleanup function
      return () => {
        onParentNavigateRef.current = null;
      };
    } catch (error) {
      console.error("Failed to mount microfrontend:", error);
    }
  }, []); // Empty dependency - mount once

  // Sync navigation from container to child
  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]); // Only run when location changes

  return <div ref={ref} />;
};
