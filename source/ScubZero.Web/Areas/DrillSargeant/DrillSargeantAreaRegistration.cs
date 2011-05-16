using System.Web.Mvc;

namespace ScubZero.Web.Areas.DrillSargeant
{
    public class DrillSargeantAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "DrillSargeant";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "DrillSargeant_default",
                "DrillSargeant/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
