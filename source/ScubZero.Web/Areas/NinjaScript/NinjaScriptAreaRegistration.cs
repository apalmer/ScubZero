using System.Web.Mvc;

namespace ScubZero.Web.Areas.NinjaScript
{
    public class NinjaScriptAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "NinjaScript";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "NinjaScript_default",
                "NinjaScript/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
